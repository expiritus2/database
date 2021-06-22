const Photo = require('../../models/photo');
const awsS3 = require('../../services/AwsS3');

class Photos {
    constructor(photos, applicant) {
        this.photos = photos;
        this.applicant = applicant;
    }

    create() {
        if (!this.photos || !this.photos.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            await this.#createPhotos(this.photos);
            resolve();
        });
    }

    update() {
        if (!this.photos || !this.photos.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            const newestPhotos = await this.#deleteRemovedPhotos();

            if (newestPhotos && newestPhotos.length) {
                await this.#createPhotos(newestPhotos);
            }
            resolve();
        });
    }

    delete(applicantId) {
        return new Promise(async (resolve) => {
            const photos = await Photo.findAll({ where: { applicantId }});
            for await (const photo of photos) {
                await awsS3.deleteObject(photo.url);
                await photo.destroy();
            }
            resolve();
        });
    }

    #createPhotos(photos) {
        return new Promise(async (resolve) => {
            const uploadedPhotos = await awsS3.setFiles(photos).upload();
            for await (const photo of uploadedPhotos) {
                const newPhoto = await Photo.create({
                    contentType: photo.contentType,
                    filename: photo.filename,
                    size: photo.size,
                    url: photo.url,
                });

                await newPhoto.setApplicant(this.applicant);
            }

            resolve();
        })
    }

    #deleteRemovedPhotos() {
        return new Promise(async (resolve) => {
            const prevStoredPhotos = this.applicant.photos || [];
            const newPhotosIds = this.photos.filter((photo) => !!photo.id).map((ls) => ls.id);

            for await (const prevStoredPhoto of prevStoredPhotos) {
                if (!newPhotosIds.includes(prevStoredPhoto.id)) {
                    await awsS3.deleteObject(prevStoredPhoto.url);
                    await Photo.destroy({ where: { id: prevStoredPhoto.id } });
                }
            }

            const newestPhotos = this.photos.filter((photo) => !photo.id);

            resolve(newestPhotos);
        });
    }
}

module.exports = Photos;