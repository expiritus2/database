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

const ThroughExperiencePosition = require('../models/through/experiencePosition');

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
                    await this.handlePhotos(true);
                    await this.handleSex(true);
                    await this.handlePhones(true);
                    await this.handleEmails(true);
                    await this.handleMessengers(true);
                    await this.handleLinks(true);
                    await this.handleFiles(true);
                    await this.handleExperiences(true);
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
                            amount: salary && salary.amount ? salary.amount : '',
                            currencyId: salary && salary.currency && salary.currency.id ? salary.currency.id : null,
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
                    await this.newApplicant.setEducation(education.id);
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
                            languageId: notChangedSkill && notChangedSkill.language && notChangedSkill.language.id ? notChangedSkill.language.id : null,
                            languageLevelId: notChangedSkill.language && notChangedSkill.languageLevel.id ? notChangedSkill.languageLevel.id : null,
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

            if (isUpdate) {
                const newestPhotos = await this.#deleteRemovedPhotos(this.updatedApplicant.id);

                if (newestPhotos && newestPhotos.length) {
                    await this.#createPhotos(newestPhotos, this.updatedApplicant);
                }
            } else {
                await this.#createPhotos(photos, this.newApplicant);
            }
            resolve();
        });
    }

    #createPhotos(photos, applicant) {
        return new Promise(async (resolve) => {
            const uploadedPhotos = await awsS3.setFiles(photos).upload();
            for await (const photo of uploadedPhotos) {
                const newPhoto = await Photo.create({
                    contentType: photo.contentType,
                    filename: photo.filename,
                    size: photo.size,
                    url: photo.url,
                });

                await newPhoto.setApplicant(applicant);
            }

            resolve();
        })
    }

    #deleteRemovedPhotos(applicantId) {
        const { photos = [] } = this.body;
        return new Promise(async (resolve) => {
            const prevStoredPhotos = await Photo.findAll({ where: { applicantId: applicantId } });
            const newPhotosIds = photos.filter((photo) => !!photo.id).map((ls) => ls.id);

            for await (const prevStoredPhoto of prevStoredPhotos) {
                if (!newPhotosIds.includes(prevStoredPhoto.id)) {
                    await awsS3.deleteObject(prevStoredPhoto.url);
                    await Photo.destroy({ where: { id: prevStoredPhoto.id } });
                }
            }

            const newestPhotos = photos.filter((photo) => !photo.id);

            resolve(newestPhotos);
        });
    }

    async handleFiles(isUpdate) {
        return new Promise(async (resolve) => {
            const { files = [] } = this.body;

            if (isUpdate) {
                const newestFiles = await this.#deleteRemovedFiles(this.updatedApplicant.id);

                if (newestFiles && newestFiles.length) {
                    await this.#createFiles(newestFiles, this.updatedApplicant);
                }

                const notChangedFiles = files.filter((file) => !!file.id);
                for await (const file of notChangedFiles) {
                    await File.update({
                        fileTypeId: file && file.fileType && file.fileType.id ? file.fileType.id : null,
                    }, { where: { id: file.id } });
                }
            } else {
                await this.#createFiles(files, this.newApplicant);
            }
            resolve();
        });
    }

    #createFiles(files, applicant) {
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

                await newFile.setApplicant(applicant);
            }

            resolve();
        })
    }

    #deleteRemovedFiles(applicantId) {
        const { files = [] } = this.body;
        return new Promise(async (resolve) => {
            const prevStoredFiles = await File.findAll({ where: { applicantId: applicantId } });
            const newFilesIds = files.filter((file) => !!file.id).map((d) => d.id);

            for await (const prevStoredFile of prevStoredFiles) {
                if (!newFilesIds.includes(prevStoredFile.id)) {
                    await awsS3.deleteObject(prevStoredFile.url);
                    await File.destroy({ where: { id: prevStoredFile.id } });
                }
            }

            const newestFiles = files.filter((file) => !file.id);

            resolve(newestFiles);
        });
    }

    async handleSex(isUpdate) {
        return new Promise(async (resolve) => {
            const { sex = {} } = this.body;

            if (sex && sex.id) {
                if (isUpdate) {
                    await this.updatedApplicant.setSex(sex.id);
                } else {
                    await this.newApplicant.setSex(sex.id);
                }
            }

            resolve();
        });
    }

    async handlePhones(isUpdate) {
        const { phones = [] } = this.body;

        return new Promise(async (resolve) => {
            if (isUpdate) {
                const newestPhones = await this.#deleteRemovedPhones(this.updatedApplicant.id);
                for await (const phone of newestPhones) {
                    await this.#createPhone(phone, this.updatedApplicant);
                }

                const notChangedPhones = phones.filter((phone) => !!phone.id);
                for await (const phone of notChangedPhones) {
                    await Phone.update({
                        phoneTypeId: phone && phone.phoneType && phone.phoneType.id ? phone.phoneType.id : null,
                        number: phone && phone.number ? phone.number : null,
                    }, { where: { id: phone.id } })
                }
            } else {
                for await (const phone of phones) {
                    await this.#createPhone(phone, this.newApplicant)
                }
            }

            resolve();
        });
    }

    #createPhone(phone, applicant) {
        return new Promise(async (resolve) => {
            const newPhone = await Phone.create({ number: phone.number });

            if (phone.phoneType && phone.phoneType.id) {
                newPhone.setPhoneType(phone.phoneType.id);
            }

            newPhone.setApplicant(applicant);
            resolve(newPhone);
        });
    }

    async handleEmails(isUpdate) {
        const { emails = [] } = this.body;

        return new Promise(async (resolve) => {
            if (isUpdate) {
                const newestEmails = await this.#deleteRemovedEmails(this.updatedApplicant.id);
                for await (const { email } of newestEmails) {
                    await this.#createEmail(email, this.updatedApplicant);
                }

                const notChangedEmails = emails.filter((phone) => !!phone.id);
                for await (const { email } of notChangedEmails) {
                    await Phone.update({ email }, { where: { id: email.id } })
                }
            } else {
                for await (const { email } of emails) {
                    await this.#createEmail(email, this.newApplicant);
                }

            }
            resolve();
        });
    }

    #deleteRemovedEmails(applicantId) {
        const { emails = [] } = this.body;
        return new Promise(async (resolve) => {
            const prevStoredEmails = await Email.findAll({ where: { applicantId: applicantId } });
            const newEmailsIds = emails.filter((email) => !!email.id).map((em) => em.id);

            for await (const prevStoredEmail of prevStoredEmails) {
                if (!newEmailsIds.includes(prevStoredEmail.id)) {
                    await Email.destroy({ where: { id: prevStoredEmail.id } });
                }
            }

            const newestEmails = emails.filter((email) => !email.id);

            resolve(newestEmails);
        });
    }

    #createEmail(email, applicant) {
        return new Promise(async (resolve) => {
            const newEmail = await Email.create({ email });
            newEmail.setApplicant(applicant);
            resolve();
        });
    }

    async handleMessengers(isUpdate) {
        return new Promise(async (resolve) => {
            const { messengers = [] } = this.body;

            if (isUpdate) {
                const newestMessengers = await this.#deleteRemovedMessengers(this.updatedApplicant.id);
                for await (const messenger of newestMessengers) {
                    await this.#createMessenger(messenger, this.updatedApplicant);
                }

                const notChangedMessengers = messengers.filter((messenger) => !!messenger.id);
                for await (const messenger of notChangedMessengers) {
                    await Messenger.update({
                        accountName: messenger && messenger.accountName ? messenger.accountName : '',
                        messengerTypeId: messenger && messenger.messengerType && messenger.messengerType.id ? messenger.messengerType.id : null,
                    }, { where: { id: messenger.id } })
                }
            } else {
                for await (const messenger of messengers) {
                    await this.#createMessenger(messenger, this.newApplicant);
                }
            }

            resolve();
        });
    }

    #deleteRemovedMessengers(applicantId) {
        const { messengers = [] } = this.body;
        return new Promise(async (resolve) => {
            const prevStoredMessengers = await Messenger.findAll({ where: { applicantId: applicantId } });
            const newMessengersIds = messengers.filter((messenger) => !!messenger.id).map((d) => d.id);

            for await (const prevStoredMessenger of prevStoredMessengers) {
                if (!newMessengersIds.includes(prevStoredMessenger.id)) {
                    await Email.destroy({ where: { id: prevStoredMessenger.id } });
                }
            }

            const newestMessengers = messengers.filter((messenger) => !messenger.id);

            resolve(newestMessengers);
        });
    }

    #createMessenger(messenger, applicant) {
        return new Promise(async (resolve) => {
            if (messenger && messenger.accountName) {
                const newMessenger = await Messenger.create({ accountName: messenger.accountName });

                if (messenger && messenger.messengerType && messenger.messengerType.id) {
                    newMessenger.setMessengerType(messenger.messengerType.id);
                }
                newMessenger.setApplicant(applicant);
            }

            resolve();
        });
    }

    async handleLinks(isUpdate) {
        return new Promise(async (resolve) => {
            const { links = [] } = this.body;

            if (isUpdate) {
                const newestLinks = await this.#deleteRemovedLinks(this.updatedApplicant.id);
                for await (const link of newestLinks) {
                    await this.#createLink(link, this.updatedApplicant);
                }

                const notChangedLinks = links.filter((link) => !!link.id);
                for await (const link of notChangedLinks) {
                    await Link.update({
                        link: link && link.link ? link.link : '',
                        linkType: link && link.linkType && link.linkType.id ? link.linkType.id : null,
                    }, { where: { id: link.id } })
                }
            } else {
                for await (const link of links) {
                    await this.#createLink(link, this.newApplicant);
                }
            }

            resolve();
        });
    }

    #createLink(link, applicant) {
        if (!link || !link.link) return Promise.resolve();

        return new Promise(async (resolve) => {
            const newLink = await Link.create({ link: link.link });

            if (link && link.linkType && link.linkType.id) {
                newLink.setLinkType(link.linkType.id);
            }
            newLink.setApplicant(applicant);
            resolve(newLink);
        });
    }

    #deleteRemovedLinks(applicantId) {
        const { links = [] } = this.body;
        return new Promise(async (resolve) => {
            const prevStoredLinks = await Link.findAll({ where: { applicantId: applicantId } });
            const newLinksIds = links.filter((link) => !!link.id).map((d) => d.id);

            for await (const prevStoredLink of prevStoredLinks) {
                if (!newLinksIds.includes(prevStoredLink.id)) {
                    await Link.destroy({ where: { id: prevStoredLink.id } });
                }
            }

            const newestLinks = links.filter((link) => !link.id);

            resolve(newestLinks);
        });
    }

    handleExperiences(isUpdate) {
        return new Promise(async (resolve) => {
            const { experiences = [] } = this.body;

            if (isUpdate) {
                const newestExperiences = await this.#deleteRemovedExperiences(this.updatedApplicant.id);
                await this.#createExperiences(newestExperiences, this.updatedApplicant);

                const notChangedExperiences = experiences.filter((experience) => !!experience.id);

                for await (const experience of notChangedExperiences) {
                    await Experience.update({
                        period: experience && experience.period ? experience.period : [],
                        company: experience && experience.company ? experience.company : '',
                        info: experience && experience.info ? experience.info : '',
                    }, { where: { id: experience.id }});


                    const prevThroughExperiences = await ThroughExperiencePosition.findAll({ where: { experienceId: experience.id } });
                    const newPositionsIds = (experience.positions || []).map((position) => position.id);

                    for await (const prevThroughExperience of prevThroughExperiences) {
                        if (!newPositionsIds.includes(prevThroughExperience.positionId)) {
                            await ThroughExperiencePosition.destroy({ where: { positionId: prevThroughExperience.positionId } });
                        }
                    }

                    for await (const newPosId of newPositionsIds) {
                        const alreadyExistRecord = await ThroughExperiencePosition.findOne({ where: { experienceId: experience.id, positionId: newPosId } });

                        if (!alreadyExistRecord) {
                            await ThroughExperiencePosition.create({
                                experienceId: experience.id,
                                positionId: newPosId,
                            });
                        }
                    }
                }
            } else {
                await this.#createExperiences(experiences, this.newApplicant);
            }

            resolve();
        })
    }

    #createExperiences(experiences, applicant) {
        return new Promise(async (resolve) => {
            for await (const experience of experiences) {
                const storedExperience = await Experience.create({
                    period: experience.period,
                    company: experience.company,
                    info: experience.info,
                });

                for await (const position of (experience.positions || [])) {
                    await storedExperience.addPosition(position.id);
                }

                storedExperience.setApplicant(applicant);
            }
            resolve();
        });
    }

    #deleteRemovedExperiences(applicantId) {
        const { experiences = [] } = this.body;
        return new Promise(async (resolve) => {
            const prevExperiences = await Experience.findAll({ where: { applicantId }, include: [{ model: VocabularyPosition }]});
            const newExperiencesIds = experiences.map((experience) => experience.id);

            for await (const prevExperience of prevExperiences) {
                if (!newExperiencesIds.includes(prevExperience.id)) {
                    for await (const position of prevExperience.positions) {
                        await ThroughExperiencePosition.destroy({ where: { experienceId: prevExperience.id }});
                    }

                    await Experience.destroy({ where: { id: prevExperience.id }});
                }
            }

            const newestExperiences = experiences.filter((experience) => !experience.id);

            resolve(newestExperiences);
        });
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

    #deleteRemovedPhones(applicantId) {
        const { phones = [] } = this.body;
        return new Promise(async (resolve) => {
            const prevStoredPhones = await Phone.findAll({ where: { applicantId: applicantId } });
            const newPhonesIds = phones.filter((phone) => !!phone.id).map((ph) => ph.id);

            for await (const prevStoredPhone of prevStoredPhones) {
                if (!newPhonesIds.includes(prevStoredPhone.id)) {
                    await Phone.destroy({ where: { id: prevStoredPhone.id } });
                }
            }

            const newestPhones = phones.filter((phone) => !phone.id);

            resolve(newestPhones);
        });
    }
}


module.exports = {
    ApplicantController,
}