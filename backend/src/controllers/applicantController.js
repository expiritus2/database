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

const VocabularyPosition = require('../models/vocabulary/position');
const VocabularySkill = require('../models/vocabulary/skill');
const VocabularyWorkPlace = require('../models/vocabulary/workPlace');
const VocabularyRegions = require('../models/vocabulary/region');

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
                const storedApplicant = await Applicant.findByPk(id);

                if (storedApplicant) {
                    storedApplicant.name = name;
                    storedApplicant.nameLat = nameLat;
                    storedApplicant.inActiveSearch = inActiveSearch;
                    storedApplicant.experienceYears = experienceYears;
                    storedApplicant.info = info;
                    storedApplicant.birthDate = birthDate;
                    this.updatedApplicant = await storedApplicant.save();
                    await this.handleSalary(true);
                    await this.handleEducation(true);
                    await this.handlePositions(true);
                    await this.handleSkills(true);
                    await this.handleWorkPlaces(true);
                    await this.handleRegions(true);
                    await this.handleLanguages(true);
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

    handleSalary(isUpdate) {
        const { salary } = this.body;

        return new Promise(async (resolve) => {
            if (isUpdate) {
                const storedApplicantSalary = await Salary.findOne({ where: { applicantId: this.updatedApplicant.id } });

                if (!storedApplicantSalary) {
                    const storedSalary = await this.#createSalary();

                    if (storedSalary) {
                        storedSalary.setApplicant(this.updatedApplicant);
                    }
                } else {
                    await Salary.update({
                            amount: (salary || {}).amount,
                            currencyId: (salary || {}).currency.id
                        },
                        { where: { applicantId: this.updatedApplicant.id } }
                    );
                }
            } else {
                const storedSalary = await this.#createSalary();

                if (storedSalary) {
                    storedSalary.setApplicant(this.newApplicant)
                }
            }

            resolve();
        })
    }

    #createSalary() {
        const { salary } = this.body;

        return new Promise(async (resolve) => {
            if (salary && salary.amount) {
                this.storedSalary = await Salary.create({ amount: salary.amount });
            }

            if (salary && salary.currency && salary.currency.id) {
                await this.storedSalary.setCurrency(salary.currency.id);
            }

            resolve(this.storedSalary);
        });
    }

    handleEducation(isUpdate) {
        return new Promise(async (resolve) => {
            const { education } = this.body;

            if (education && education.id) {
                if (isUpdate) {
                    await this.updatedApplicant.update({ educationId: education.id });
                } else {
                    await this.updatedApplicant.setEducation(education.id);
                }
            }
            resolve();
        });
    }

    handlePositions(isUpdate) {
        return new Promise(async (resolve) => {
            const { positions = [] } = this.body;

            if (isUpdate) {
                const newestPositionsIds = await this.#deleteRemovedPositions(this.updatedApplicant.id);

                for await (const newPosId of newestPositionsIds) {
                    await this.updatedApplicant.addPosition(newPosId);
                }
            } else {
                for await (const position of positions) {
                    if (position && position.id) {
                        await this.newApplicant.addPosition(position.id)
                    }
                }
            }

            resolve();
        });
    }

    handleSkills(isUpdate) {
        return new Promise(async (resolve) => {
            const { skills = [] } = this.body;

            if (isUpdate) {
                const newestSkillsIds = await this.#deleteRemovedSkills(this.updatedApplicant.id);

                for await (const newSkillId of newestSkillsIds) {
                    await this.updatedApplicant.addSkill(newSkillId);
                }
            } else {
                for await (const skill of skills) {
                    if (skill && skill.id) {
                        await this.newApplicant.addSkill(skill.id);
                    }
                }
            }

            resolve();
        });
    }

    handleWorkPlaces(isUpdate) {
        const { workPlaces } = this.body;

        return new Promise(async (resolve) => {
            if (isUpdate) {
                const newestWorkPlacesIds = await this.#deleteRemovedWorkPlaces(this.updatedApplicant.id);

                for await (const newWorkPlaceId of newestWorkPlacesIds) {
                    await this.updatedApplicant.addWorkPlace(newWorkPlaceId);
                }
            } else {
                for await (const workPlace of workPlaces) {
                    if (workPlace && workPlace.id) {
                        await this.newApplicant.addWorkPlace(workPlace.id);
                    }
                }
            }

            resolve();
        });
    }

    async handleRegions(isUpdate) {
        const { regions = [] } = this.body;

        return new Promise(async (resolve) => {
            if (isUpdate) {
                const newestRegionsIds = await this.#deleteRemovedRegions(this.updatedApplicant.id);

                for await (const regionId of newestRegionsIds) {
                    await this.updatedApplicant.addRegion(regionId);
                }
            } else {
                for await (const region of regions) {
                    if (region && region.id) {
                        await this.newApplicant.addRegion(region.id);
                    }
                }
            }

            resolve();
        });
    }

    async handleLanguages(isUpdate) {
        return new Promise(async (resolve) => {
            const { languageSkills = [] } = this.body;

            if (isUpdate) {
                const newestLanguageSkills = await this.#deleteRemovedLanguageSkills(this.updatedApplicant.id);
                const notChangedLanguageSkills = languageSkills.filter((languageSkill) => !!languageSkill.id);

                for await (const languageSkill of newestLanguageSkills) {
                    const storedLanguageSkill = await this.#createLanguageSkill(languageSkill);

                    if (storedLanguageSkill) {
                        await this.updatedApplicant.addLanguageSkill(storedLanguageSkill);
                    }
                }

                for await (const notChangedSkill of notChangedLanguageSkills) {
                    await LanguageSkill.update({
                            languageId: notChangedSkill.language.id,
                            languageLevelId: notChangedSkill.languageLevel.id,
                        },
                        {
                            where: { id: notChangedSkill.id }
                        });
                }
            } else {
                for await (const languageSkill of languageSkills) {
                    const storedLanguageSkill = await this.#createLanguageSkill(languageSkill);

                    await this.newApplicant.addLanguageSkill(storedLanguageSkill);
                }
            }

            resolve();
        });
    }

    #createLanguageSkill(languageSkill) {
        return new Promise(async (resolve) => {
            const storedLanguageSkill = await LanguageSkill.create({});

            if (languageSkill.language && languageSkill.language.id) {
                await storedLanguageSkill.setLanguage(languageSkill.language.id);
            }

            if (languageSkill.languageLevel && languageSkill.languageLevel.id) {
                await storedLanguageSkill.setLanguageLevel(languageSkill.languageLevel.id);
            }

            resolve(storedLanguageSkill);
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

            for await (const { email } of emails) {
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

    #deleteRemovedPositions(applicantId) {
        const { positions = [] } = this.body;
        return new Promise(async (resolve) => {
            const storedApplicant = await Applicant.findByPk(applicantId, { include: { model: VocabularyPosition } })
            const prevPositionsIds = storedApplicant.positions || [];
            const newPositionsIds = positions.map((position) => position.id);

            for await (const prevPosId of prevPositionsIds) {
                if (!newPositionsIds.includes(prevPosId)) {
                    await storedApplicant.removePosition(prevPosId);
                }
            }

            const newestPositionsIds = newPositionsIds.filter((newPosId) => !prevPositionsIds.includes(newPosId));

            resolve(newestPositionsIds);
        });
    }

    #deleteRemovedSkills(applicantId) {
        const { skills = [] } = this.body;
        return new Promise(async (resolve) => {
            const storedApplicant = await Applicant.findByPk(applicantId, { include: { model: VocabularySkill } })
            const prevSkillsIds = storedApplicant.skills || [];
            const newSkillsIds = skills.map((skill) => skill.id);

            for await (const prevSkillId of prevSkillsIds) {
                if (!newSkillsIds.includes(prevSkillId)) {
                    await storedApplicant.removeSkill(prevSkillId);
                }
            }

            const newestPositionsIds = newSkillsIds.filter((newPosId) => !prevSkillsIds.includes(newPosId));

            resolve(newestPositionsIds);
        });
    }

    #deleteRemovedWorkPlaces(applicantId) {
        const { workPlaces = [] } = this.body;
        return new Promise(async (resolve) => {
            const storedApplicant = await Applicant.findByPk(applicantId, { include: { model: VocabularyWorkPlace } })
            const prevWorkPlacesIds = storedApplicant.workPlaces || [];
            const newWorkPlacesIds = workPlaces.map((workPlace) => workPlace.id);

            for await (const prevWorkPlaceId of prevWorkPlacesIds) {
                if (!newWorkPlacesIds.includes(prevWorkPlaceId)) {
                    await storedApplicant.removeWorkPlace(prevWorkPlaceId);
                }
            }

            const newestWorkPlacesIds = newWorkPlacesIds.filter((newWorkPlaceId) => !prevWorkPlacesIds.includes(newWorkPlaceId));

            resolve(newestWorkPlacesIds);
        });
    }

    #deleteRemovedRegions(applicantId) {
        const { regions = [] } = this.body;
        return new Promise(async (resolve) => {
            const storedApplicant = await Applicant.findByPk(applicantId, { include: { model: VocabularyRegions } })
            const prevRegionsIds = storedApplicant.regions || [];
            const newRegionsIds = regions.map((region) => region.id);

            for await (const prevRegionId of prevRegionsIds) {
                if (!newRegionsIds.includes(prevRegionId)) {
                    await storedApplicant.removeRegion(prevRegionId);
                }
            }

            const newestRegionsIds = newRegionsIds.filter((newRegionId) => !prevRegionsIds.includes(newRegionId));

            resolve(newestRegionsIds);
        });
    }

    #deleteRemovedLanguageSkills(applicantId) {
        const { languageSkills = [] } = this.body;
        return new Promise(async (resolve) => {
            const storedApplicant = await Applicant.findByPk(applicantId, { include: { model: LanguageSkill } })
            const prevLanguageSkillsIds = (storedApplicant.languageSkills || []).map((languageSkill) => languageSkill.id);
            const newLanguageSkillsIds = languageSkills.map((languageSkill) => languageSkill.id).filter((ls) => !!ls);

            for await (const prevLanguageSkillId of prevLanguageSkillsIds) {
                if (!newLanguageSkillsIds.includes(prevLanguageSkillId)) {
                    await storedApplicant.removeLanguageSkill(prevLanguageSkillId);
                    await LanguageSkill.destroy({ where: { id: prevLanguageSkillId } })
                }
            }

            const newestLanguageSkills = languageSkills.filter((languageSkill) => !languageSkill.id);

            resolve(newestLanguageSkills);
        });
    }
}


module.exports = {
    ApplicantController,
}