const File = require('../../models/file');
const awsS3 = require('../../services/AwsS3');

class Files {
    constructor(files, applicant) {
        this.files = files;
        this.applicant = applicant;
    }

    create() {
        if (!this.files || !this.files.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            await this.#createFiles(this.files);
            resolve();
        });
    }

    update() {
        if (!this.files || !this.files.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            const newestFiles = await this.#deleteRemovedFiles();

            if (newestFiles && newestFiles.length) {
                await this.#createFiles(newestFiles);
            }

            const notChangedFiles = this.files.filter((file) => !!file.id);
            for await (const file of notChangedFiles) {
                await File.update({
                    fileTypeId: file && file.fileType && file.fileType.id ? file.fileType.id : null,
                }, { where: { id: file.id } });
            }
            resolve();
        });
    }

    #createFiles(files) {
        return new Promise(async (resolve) => {
            const uploadedFiles = await awsS3.setFiles(files).upload();
            for await (const file of uploadedFiles) {
                const newFile = await File.create({
                    contentType: file.contentType,
                    filename: file.filename,
                    size: file.size,
                    url: file.url,
                    fileTypeId: file.fileType && file.fileType.id ? file.fileType.id : null,
                });

                await newFile.setApplicant(this.applicant);
            }

            resolve();
        })
    }

    #deleteRemovedFiles(applicantId) {
        return new Promise(async (resolve) => {
            const prevStoredFiles = this.applicant.files || []
            const newFilesIds = this.files.filter((file) => !!file.id).map((d) => d.id);

            for await (const prevStoredFile of prevStoredFiles) {
                if (!newFilesIds.includes(prevStoredFile.id)) {
                    await awsS3.deleteObject(prevStoredFile.url);
                    await File.destroy({ where: { id: prevStoredFile.id } });
                }
            }

            const newestFiles = this.files.filter((file) => !file.id);

            resolve(newestFiles);
        });
    }

}

module.exports = Files;