const Applicant = require('../models/applicant');

const File = require('../models/file');
const Photo = require('../models/photo');
const Phone = require('../models/phone');
const Email = require('../models/email');
const Link = require('../models/link');
const Experience = require('../models/experience');
const Messenger = require('../models/messenger');
const Salary = require('../models/salary');
const LanguageSkill = require('../models/languageSkill');

const DatabaseCreationError = require('../errors/database-creation-error');
const awsS3 = require('../services/AwsS3');

const { includeModels } = require('../settings/applicant');

class ApplicantController {
    constructor(body) {
        this.body = body;
    }

    create(options = {}) {
        return new Promise(async (resolve) => {
            try {
                const { name, nameLat, inActiveSearch, experienceYears, info, birthDate } = this.body;
                const config = { name, nameLat, inActiveSearch, experienceYears, info, birthDate };

                this.newApplicant = await Applicant.create(config, options);
                await this.handleSalary();
                await this.handleEducation();
                await this.handlePositions();
                await this.handleSkills();
                await this.handleWorkPlaces();
                await this.handleRegions();
                await this.handleLanguages();
                await this.handlePhotos();
                await this.handleSex();
                await this.handlePhones();
                await this.handleEmails();
                await this.handleMessengers();
                await this.handleLinks();
                await this.handleFiles();
                await this.handleExperiences();

                resolve(this.newApplicant);
            } catch (e) {
                throw new DatabaseCreationError();
            }
        });
    }

    update(id) {
        return new Promise(async (resolve) => {
            try {
                const { name, nameLat, inActiveSearch, experienceYears, info, birthDate } = this.body;
                const storedApplicant = await Applicant.findOne({ where: { id }, include: includeModels });

                if (storedApplicant) {
                    storedApplicant.name = name;
                    storedApplicant.nameLat = nameLat;
                    storedApplicant.inActiveSearch = inActiveSearch;
                    storedApplicant.experienceYears = experienceYears;
                    storedApplicant.info = info;
                    storedApplicant.birthDate = birthDate;
                    this.updatedApplicant = await storedApplicant.save();
                    //     await this.handleSalary(true);
                    //     await this.handleEducation(true);
                    //     await this.handlePositions(true);
                    //     await this.handleSkills(true);
                    //     await this.handleWorkPlaces(true);
                    //     await this.handleRegions(true);
                    //     await this.handleLanguages(true);
                    //     await this.handlePhotos(true);
                    //     await this.handleSex(true);
                    //     await this.handlePhones(true);
                    //     await this.handleEmails(true);
                    //     await this.handleMessengers(true);
                    //     await this.handleLinks(true);
                    //     await this.handleFiles(true);
                    //     await this.handleExperiences(true);
                }


                resolve(this.updatedApplicant);
            } catch (e) {
                console.error(e);
                throw new DatabaseCreationError();
            }
        });
    }

    handleSalary() {
        return new Promise(async (resolve) => {
            const { salary } = this.body;

            if (salary && salary.amount) {
                this.storedSalary = await Salary.create({ amount: salary.amount });
            }

            if (salary && salary.currency && salary.currency.id) {
                await this.storedSalary.setCurrency(salary.currency.id);
                await this.newApplicant.setSalary(this.storedSalary);
            }

            resolve();
        })
    }

    handleEducation() {
        return new Promise(async (resolve) => {
            const { education } = this.body;

            if (education && education.id) {
                await this.newApplicant.setEducation(education.id);
            }
            resolve();
        });
    }

    handlePositions() {
        return new Promise(async (resolve) => {
            const { positions = [] } = this.body;

            for await (const position of positions) {
                if (position && position.id) {
                    await this.newApplicant.addPosition(position.id)
                }
            }

            resolve();
        });
    }

    handleSkills() {
        return new Promise(async (resolve) => {
            const { skills = [] } = this.body;

            for await (const skill of skills) {
                if (skill && skill.id) {
                    await this.newApplicant.addSkill(skill.id);
                }
            }

            resolve();
        });
    }

    handleWorkPlaces() {
        return new Promise(async (resolve) => {
            const { workPlaces } = this.body;

            for await (const workPlace of workPlaces) {
                if (workPlace && workPlace.id) {
                    await this.newApplicant.addWorkPlace(workPlace.id);
                }
            }

            resolve();
        });
    }

    async handleRegions() {
        return new Promise(async (resolve) => {
            const { regions = [] } = this.body;

            for await (const region of regions) {
                if (region && region.id) {
                    await this.newApplicant.addRegion(region.id);
                }
            }

            resolve();
        });
    }

    async handleLanguages() {
        return new Promise(async (resolve) => {
            const { languages = [] } = this.body;

            for await (const language of languages) {
                const storedLanguageSkill = await LanguageSkill.create({});

                if (language.name && language.name.id) {
                    await storedLanguageSkill.setLanguage(language.name.id);
                }

                if (language.level && language.level.id) {
                    await storedLanguageSkill.setLanguageLevel(language.level.id);
                }

                await this.newApplicant.addLanguageSkill(storedLanguageSkill);
            }

            resolve();
        });
    }

    async handlePhotos(isUpdate) {
        return new Promise(async (resolve) => {
            const { photos = [] } = this.body;
            const uploadedPhotos = await awsS3.setFiles(photos).upload();

            for await (const photo of uploadedPhotos) {
                if (isUpdate) {
                    // await this._deleteRemovedFiles();
                    // const prevFile = await File.findByPk(file.id);
                    //
                    // if (!prevFile) {
                    //     this.newFile = await File.create(file);
                    //     await this.newFile.setFileType(this.savedFileType);
                    //     await this.newFile.setApplicant(this.newApplicant);
                    // } else {
                    //     prevFile.setFileType(this.savedFileType);
                    // }
                } else {
                    const newPhoto = await Photo.create({
                        contentType: photo.contentType,
                        filename: photo.filename,
                        size: photo.size,
                        url: photo.url,
                    });

                    await newPhoto.setApplicant(this.newApplicant);
                }
            }
            resolve();
        });
    }

    async handleFiles(isUpdate) {
        return new Promise(async (resolve) => {
            const { files = [] } = this.body;
            const uploadedFiles = await awsS3.setFiles(files).upload();

            for await (const file of uploadedFiles) {
                if (isUpdate) {
                    // await this._deleteRemovedFiles();
                    // const prevFile = await File.findByPk(file.id);
                    //
                    // if (!prevFile) {
                    //     this.newFile = await File.create(file);
                    //     await this.newFile.setFileType(this.savedFileType);
                    //     await this.newFile.setApplicant(this.newApplicant);
                    // } else {
                    //     prevFile.setFileType(this.savedFileType);
                    // }
                } else {
                    const newFile = await File.create({
                        contentType: file.contentType,
                        filename: file.filename,
                        size: file.size,
                        url: file.url,
                    });

                    if (file.fileType && file.fileType.id) {
                        await newFile.setFileType(file.fileType.id);
                    }

                    await newFile.setApplicant(this.newApplicant);
                }
            }
            resolve();
        });
    }

    async handleSex() {
        return new Promise(async (resolve) => {
            const { sex = {} } = this.body;

            await this.newApplicant.setSex(sex.id);

            resolve();
        });
    }

    async handlePhones() {
        return new Promise(async (resolve) => {
            const { phones = [] } = this.body;

            for await (const phone of phones) {
                const newPhone = await Phone.create({ number: phone.number });

                if (phone.type && phone.type.id) {
                    newPhone.setPhoneType(phone.type.id);
                    newPhone.setApplicant(this.newApplicant);
                }
            }

            resolve();
        });
    }

    async handleEmails() {
        return new Promise(async (resolve) => {
            const { emails = [] } = this.body;

            for await (const email of emails) {
                const newEmail = await Email.create({ email });
                newEmail.setApplicant(this.newApplicant);
            }

            resolve();
        });
    }

    async handleMessengers() {
        return new Promise(async (resolve) => {
            const { messengers = [] } = this.body;

            for await (const messenger of messengers) {
                const newMessenger = await Messenger.create({ accountName: messenger.accountName });
                newMessenger.setMessengerType(messenger.type.id);
                newMessenger.setApplicant(this.newApplicant);
            }

            resolve();
        });
    }

    async handleLinks() {
        return new Promise(async (resolve) => {
            const { links = [] } = this.body;

            for await (const link of links) {
                const newLink = await Link.create({ link: link.link });
                newLink.setLinkType(link.type.id);
                newLink.setApplicant(this.newApplicant);
            }

            resolve();
        });
    }

    handleExperiences(isUpdate) {
        return new Promise(async (resolve) => {
            const { experiences = [] } = this.body;
            if (isUpdate) {
                // await this._deleteRemovedApplicantExperience();
            }

            for await (const experience of experiences) {
                if (isUpdate) {
                    // if (experience.id) {
                    //     await this._updateExperience(experience);
                    // } else {
                    //     await this._findOrCreateApplicantExperience(experience);
                    //     await this.savedExperience.setApplicant(this.newApplicant);
                    //     await this.handlePositions(experience.positions, this.savedExperience, isUpdate);
                    // }
                } else {
                    const storedExperience = await Experience.create({
                        period: experience.period,
                        company: experience.company,
                        info: experience.info,
                    });

                    for await (const position of (experience.positions || [])) {
                        await storedExperience.addPosition(position.id);
                    }

                    this.newApplicant.addExperience(storedExperience);
                }
            }
            resolve(this.savedExperience);
        })
    }


    // deleteFiles() {
    //     return new Promise(async (resolve) => {
    //         for await (const fileUrl of this.prevApplicant.files) {
    //             if (!this.newApplicant.files.includes(fileUrl)) {
    //                 await this.deleteFile(fileUrl);
    //             }
    //         }
    //
    //         for await (const imageUrl of this.prevApplicant.photos) {
    //             if (!this.newApplicant.photos.includes(imageUrl)) {
    //                 await this.deleteFile(imageUrl);
    //             }
    //         }
    //         resolve();
    //     });
    // }
    //
    // deleteFile(fileUrl){
    //     return new Promise((resolve) => {
    //         const key = fileUrl.split('/').pop();
    //         s3.deleteObject({
    //             Bucket: process.env.AWS_S3_BUCKET_NAME,
    //             Key: key,
    //         }, (err, data) => {
    //             if (err) throw new Error();
    //             resolve();
    //         });
    //     })
    // }
    //
    //
    // async handlePhotos(isUpdate) {
    //     return new Promise(async (resolve) => {
    //         for await (const photo of this.photos) {
    //             if (isUpdate) {
    //                 await this._deleteRemovedPhotos();
    //                 const prevPhoto = await File.findByPk(photo.id);
    //
    //                 if (!prevPhoto) {
    //                     this.newPhoto = await File.create(photo);
    //                     await this.newPhoto.setApplicant(this.newApplicant);
    //                 }
    //             } else {
    //                 this.newPhoto = await File.create(photo);
    //                 await this.newPhoto.setApplicant(this.newApplicant);
    //             }
    //         }
    //         resolve(this.newPhoto);
    //     });
    // }
    //
    //
    // async _deleteRemovedApplicantRegion() {
    //     const newRegionsIds = this.regions.map((region) => region.id);
    //     for await (const prevRegion of this.newApplicant.regions) {
    //         if (!newRegionsIds.includes(prevRegion.id)) {
    //             await this.newApplicant.removeRegion(prevRegion);
    //         }
    //     }
    // }
    //
    // async _deleteRemovedFiles() {
    //     const newFilesIds = this.files.map((file) => file.id);
    //     const prevFiles = await File.findAll({ where: { applicantId: this.newApplicant.id }})
    //     for await (const prevFile of prevFiles) {
    //         if (!newFilesIds.includes(prevFile.id)) {
    //             await File.destroy({ where: { id: prevFile.id }});
    //             await awsS3.deleteObject(prevFile.url);
    //         }
    //     }
    // }
    //
    // async _deleteRemovedPhotos() {
    //     const newPhotosIds = this.photos.map((photo) => photo.id);
    //     const prevPhotos = await File.findAll({ where: { applicantId: this.newApplicant.id }})
    //     for await (const prevPhoto of prevPhotos) {
    //         if (!newPhotosIds.includes(prevPhoto.id)) {
    //             await File.destroy({ where: { id: prevPhoto.id }});
    //             await awsS3.deleteObject(prevPhoto.url);
    //         }
    //     }
    // }
    //
    // async _deleteRemovedApplicantSkills() {
    //     for await (const prevSkill of this.newApplicant.skills) {
    //         const newSkillsIds = this.skills.map((skills) => skills.id);
    //         if (!newSkillsIds.includes(prevSkill.id)) {
    //             await this.newApplicant.removeSkill(prevSkill);
    //         }
    //     }
    // }
    //
    // async _deleteRemovedPositions(positions, parentModel) {
    //     for await (const prevPos of parentModel.positions || []) {
    //         const newPositionsIds = positions.map((position) => position.id);
    //         if (!newPositionsIds.includes(prevPos.id)) {
    //             await parentModel.removePosition(prevPos);
    //         }
    //     }
    // }
    //
    // async _deleteRemovedApplicantExperience() {
    //     const savedExperiences = await Experience.findAll({ where: { applicantId: this.newApplicant.id } });
    //     const newExperiencesIds = this.experiences.map((experience) => experience.id);
    //     for await (const prevExperience of savedExperiences) {
    //         if (!newExperiencesIds.includes(prevExperience.id)) {
    //             await Experience.destroy({ where: { id: prevExperience.id } });
    //         }
    //     }
    // }
    //
    // async _findOrCreateApplicantExperience(experience) {
    //     this.savedExperience = await Experience.findByPk(experience.id);
    //
    //     if (!this.savedExperience) {
    //         this.savedExperience = await Experience.create(experience);
    //         await this.savedExperience.setApplicant(this.newApplicant);
    //     }
    // }
    //
    // async _updateExperience(experience) {
    //     const expInfo = omit(experience, 'positions');
    //     this.savedExperience = await Experience.findByPk(expInfo.id);
    //
    //     if (this.savedExperience) {
    //         await Experience.update(expInfo, { where: { id: expInfo.id } });
    //         this.savedExperience = await Experience.findByPk(expInfo.id, { include: { model: Position } });
    //         await this.handlePositions(experience.positions, this.savedExperience, true);
    //     }
    // }
}


module.exports = {
    ApplicantController,
}