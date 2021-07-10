const PhotoModel = require('../../models/photo');
const awsS3 = require('../../services/AwsS3');

class Photo {
    constructor(photo, company) {
        this.photo = photo;
        this.company = company;
    }

    create() {
        if (!Object.keys(this.photo || {}).length) return Promise.resolve();

        return new Promise(async (resolve) => {
            await this.#createPhoto(this.photo);
            resolve();
        });
    }

    update() {
        if (!this.photo) return Promise.resolve();

        return new Promise(async (resolve) => {
            const newestPhoto = await this.#deleteRemovedPhoto();

            if (newestPhoto) {
                await this.#createPhoto(newestPhoto);
            }
            resolve();
        });
    }

    delete(companyId) {
        return new Promise(async (resolve) => {
            const photos = await PhotoModel.findAll({ where: { companyId } });
            for await (const photo of photos) {
                await awsS3.deleteObject(photo.url);
                await photo.destroy();
            }
            resolve();
        });
    }

    #createPhoto(photo) {
        return new Promise(async (resolve) => {
            const uploadedPhoto = await awsS3.setFiles([photo]).upload();
            for await (const photo of uploadedPhoto) {
                const newPhoto = await PhotoModel.create({
                    contentType: photo.contentType,
                    filename: photo.filename,
                    size: photo.size,
                    url: photo.url,
                });

                await newPhoto.setCompany(this.company);
            }

            resolve();
        })
    }

    #deleteRemovedPhoto() {
        return new Promise(async (resolve) => {
            const prevStoredPhoto = this.company.photo || [];

            if (this.photo.id !== prevStoredPhoto.id) {
                await awsS3.deleteObject(prevStoredPhoto.url);
                await PhotoModel.destroy({ where: { id: prevStoredPhoto.id } });
            }


            const newestPhoto = !this.photo.id ? this.photo : null;

            resolve(newestPhoto);
        });
    }
}

module.exports = Photo;