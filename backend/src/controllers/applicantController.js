const Applicant = require('../models/applicant');
const Position = require('../models/vocabulary/position');
const Skill = require('../models/vocabulary/skill');
const Experience = require('../models/experience');
const Region = require('../models/vocabulary/region');
const File = require('../models/file');
const FileType = require('../models/vocabulary/fileType');
const DatabaseCreationError = require('../errors/database-creation-error');
const { omit } = require('lodash');
const { s3 } = require('../middlewares/file-upload');
const awsS3 = require('../services/AwsS3');

class ApplicantController {
    constructor(body, files, photos) {
        this.body = body;
        this.regions = this.body.regions;
        this.skills = this.body.skills;
        this.positions = this.body.positions;
        this.experiences = this.body.experiences;
        this.files = files;
        this.photos = photos;

        this.joinedInfo = omit(this.body, ['regions', 'skills', 'positions', 'experiences', 'files', 'photos']);
    }

    create(options = {}) {
        return new Promise(async (resolve) => {
            try {
                this.newApplicant = await Applicant.create(this.joinedInfo, options);
                await this.handlePositions(this.positions, this.newApplicant);
                await this.handleSkills();
                await this.handleRegions();
                await this.handleExperiences();
                await this.handleFiles();
                await this.handlePhotos();

                resolve(this.newApplicant);
            } catch (e) {
                throw new DatabaseCreationError();
            }
        });
    }

    update(id) {
        return new Promise(async (resolve) => {
            try {
                this.prevApplicant = await Applicant.findByPk(id);
                await Applicant.update(this.joinedInfo, { where: { id } });
                this.newApplicant = await Applicant.findByPk(id, { include: { all: true } });

                if (this.newApplicant) {
                    await this.handlePositions(this.positions, this.newApplicant, true);
                    await this.handleSkills(true);
                    await this.handleRegions(true);
                    await this.handleExperiences(true);
                }

                // await this.deleteFiles();

                resolve(this.newApplicant);
            } catch (e) {
                console.error(e);
                throw new DatabaseCreationError();
            }
        });
    }

    deleteFiles() {
        return new Promise(async (resolve) => {
            for await (const fileUrl of this.prevApplicant.files) {
                if (!this.newApplicant.files.includes(fileUrl)) {
                    await this.deleteFile(fileUrl);
                }
            }

            for await (const imageUrl of this.prevApplicant.photos) {
                if (!this.newApplicant.photos.includes(imageUrl)) {
                    await this.deleteFile(imageUrl);
                }
            }
            resolve();
        });
    }

    deleteFile(fileUrl){
        return new Promise((resolve) => {
            const key = fileUrl.split('/').pop();
            s3.deleteObject({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: key,
            }, (err, data) => {
                if (err) throw new Error();
                resolve();
            });
        })
    }

    handlePositions(positions, parentModel, isUpdate) {
        return new Promise(async (resolve) => {
            if (positions && !positions.length) {
                await this._deleteRemovedPositions(positions, parentModel);
            }

            for await (const pos of positions) {
                this.savedPosition = await Position.findOne({ where: { value: pos.value } });

                if (isUpdate) {
                    await this._deleteRemovedPositions(positions, parentModel);
                    await parentModel.addPosition(this.savedPosition);
                } else {
                    await parentModel.addPosition(this.savedPosition);
                }
            }
            resolve(this.savedPosition);
        });
    }

    handleSkills(isUpdate) {
        return new Promise(async (resolve) => {
            for await (const skill of this.skills) {
                this.savedSkill = await Skill.findOne({ where: { value: skill.value } });

                if (isUpdate) {
                    await this._deleteRemovedApplicantSkills();
                    await this.newApplicant.addSkill(this.savedSkill);
                } else {
                    await this.newApplicant.addSkill(this.savedSkill);
                }
            }
            resolve(this.savedSkill);
        });
    }

    async handleRegions(isUpdate) {
        return new Promise(async (resolve) => {
            for await (const region of this.regions) {
                this.savedRegion = await Region.findOne({ where: { value: region.value } });

                if (isUpdate) {
                    await this._deleteRemovedApplicantRegion();
                    await this.newApplicant.addRegion(this.savedRegion);
                } else {
                    await this.newApplicant.addRegion(this.savedRegion);
                }
            }
            resolve(this.savedRegion);
        });
    }

    async handleFiles(isUpdate) {
        return new Promise(async (resolve) => {
            for await (const file of this.files) {
                if (file.fileType && file.fileType.id) {
                    this.savedFileType = await FileType.findByPk(file.fileType.id);
                }

                if (isUpdate) {
                    await this._deleteRemovedFiles();
                    const prevFile = await File.findByPk(file.id);

                    if (!prevFile) {
                        this.newFile = await File.create(file);
                        await this.newFile.setFileType(this.savedFileType);
                        await this.newFile.setApplicant(this.newApplicant);
                    } else {
                        prevFile.setFileType(this.savedFileType);
                    }
                } else {
                    this.newFile = await File.create(file);
                    await this.newFile.setFileType(this.savedFileType);
                    await this.newFile.setApplicant(this.newApplicant);
                }
            }
            resolve(this.newFile);
        });
    }

    async handlePhotos(isUpdate) {
        return new Promise(async (resolve) => {
            for await (const photo of this.photos) {
                if (isUpdate) {
                    await this._deleteRemovedPhotos();
                    const prevPhoto = await File.findByPk(photo.id);

                    if (!prevPhoto) {
                        this.newPhoto = await File.create(photo);
                        await this.newPhoto.setApplicant(this.newApplicant);
                    }
                } else {
                    this.newPhoto = await File.create(photo);
                    await this.newPhoto.setApplicant(this.newApplicant);
                }
            }
            resolve(this.newPhoto);
        });
    }

    handleExperiences(isUpdate) {
        return new Promise(async (resolve) => {
            if (isUpdate) {
                await this._deleteRemovedApplicantExperience();
            }

            for await (const experience of this.experiences) {
                if (isUpdate) {
                    if (experience.id) {
                        await this._updateExperience(experience);
                    } else {
                        await this._findOrCreateApplicantExperience(experience);
                        await this.savedExperience.setApplicant(this.newApplicant);
                        await this.handlePositions(experience.positions, this.savedExperience, isUpdate);
                    }
                } else {
                    await this._findOrCreateApplicantExperience(experience);
                    await this.handlePositions(experience.positions, this.savedExperience, isUpdate);
                }
            }
            resolve(this.savedExperience);
        })
    }

    async _deleteRemovedApplicantRegion() {
        const newRegionsIds = this.regions.map((region) => region.id);
        for await (const prevRegion of this.newApplicant.regions) {
            if (!newRegionsIds.includes(prevRegion.id)) {
                await this.newApplicant.removeRegion(prevRegion);
            }
        }
    }

    async _deleteRemovedFiles() {
        const newFilesIds = this.files.map((file) => file.id);
        const prevFiles = await File.findAll({ where: { applicantId: this.newApplicant.id }})
        for await (const prevFile of prevFiles) {
            if (!newFilesIds.includes(prevFile.id)) {
                await File.destroy({ where: { id: prevFile.id }});
                await awsS3.deleteObject(prevFile.url);
            }
        }
    }

    async _deleteRemovedPhotos() {
        const newPhotosIds = this.photos.map((photo) => photo.id);
        const prevPhotos = await File.findAll({ where: { applicantId: this.newApplicant.id }})
        for await (const prevPhoto of prevPhotos) {
            if (!newPhotosIds.includes(prevPhoto.id)) {
                await File.destroy({ where: { id: prevPhoto.id }});
                await awsS3.deleteObject(prevPhoto.url);
            }
        }
    }

    async _deleteRemovedApplicantSkills() {
        for await (const prevSkill of this.newApplicant.skills) {
            const newSkillsIds = this.skills.map((skills) => skills.id);
            if (!newSkillsIds.includes(prevSkill.id)) {
                await this.newApplicant.removeSkill(prevSkill);
            }
        }
    }

    async _deleteRemovedPositions(positions, parentModel) {
        for await (const prevPos of parentModel.positions || []) {
            const newPositionsIds = positions.map((position) => position.id);
            if (!newPositionsIds.includes(prevPos.id)) {
                await parentModel.removePosition(prevPos);
            }
        }
    }

    async _deleteRemovedApplicantExperience() {
        const savedExperiences = await Experience.findAll({ where: { applicantId: this.newApplicant.id } });
        const newExperiencesIds = this.experiences.map((experience) => experience.id);
        for await (const prevExperience of savedExperiences) {
            if (!newExperiencesIds.includes(prevExperience.id)) {
                await Experience.destroy({ where: { id: prevExperience.id } });
            }
        }
    }

    async _findOrCreateApplicantExperience(experience) {
        this.savedExperience = await Experience.findByPk(experience.id);

        if (!this.savedExperience) {
            this.savedExperience = await Experience.create(experience);
            await this.savedExperience.setApplicant(this.newApplicant);
        }
    }

    async _updateExperience(experience) {
        const expInfo = omit(experience, 'positions');
        this.savedExperience = await Experience.findByPk(expInfo.id);

        if (this.savedExperience) {
            await Experience.update(expInfo, { where: { id: expInfo.id } });
            this.savedExperience = await Experience.findByPk(expInfo.id, { include: { model: Position } });
            await this.handlePositions(experience.positions, this.savedExperience, true);
        }
    }
}


module.exports = {
    ApplicantController,
}