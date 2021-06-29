const DatabaseCreationError = require('../../errors/database-creation-error');

const Applicant = require('../../models/applicant');

const Salary = require('./salary');
const Education = require('./education');
const Positions = require('./positions');
const Skills = require('./skills');
const WorkPlaces = require('./workPlaces');
const Regions = require('./regions');
const LanguageSkills = require('./languages');
const Photos = require('./photos');
const Sex = require('./sex');
const Phones = require('./phones');
const Emails = require('./emails');
const Messengers = require('./messengers');
const Links = require('./links');
const Files = require('./files');
const Experiences = require('./experiences');

const { includeModelsFull, includeModelsLight, attributesLight } = require('../../settings/applicant');

class ApplicantController {
    constructor(body) {
        this.body = body;
    }

    create(options = {}) {
        return new Promise(async (resolve) => {
            try {
                const { name, nameLat, inActiveSearch, experienceYears, info, birthDate, address } = this.body;
                const config = { name, nameLat, inActiveSearch, experienceYears, info, birthDate, address };

                this.newApplicant = await Applicant.create(config, options);

                await new Salary(this.body.salary, this.newApplicant).create();
                await new Education(this.body.education, this.newApplicant).create();
                await new Positions(this.body.positions, this.newApplicant).create();
                await new Skills(this.body.skills, this.newApplicant).create();
                await new WorkPlaces(this.body.workPlaces, this.newApplicant).create();
                await new Regions(this.body.regions, this.newApplicant).create();
                await new LanguageSkills(this.body.languageSkills, this.newApplicant).create();
                await new Photos(this.body.photos, this.newApplicant).create();
                await new Sex(this.body.sex, this.newApplicant).create();
                await new Phones(this.body.phones, this.newApplicant).create();
                await new Emails(this.body.emails, this.newApplicant).create();
                await new Messengers(this.body.messengers, this.newApplicant).create();
                await new Links(this.body.links, this.newApplicant).create();
                await new Files(this.body.files, this.newApplicant).create();
                await new Experiences(this.body.experiences, this.newApplicant).create();

                this.newApplicant = await Applicant.findByPk(this.newApplicant.id, { include: includeModelsLight, attributes: attributesLight })

                resolve(this.newApplicant);
            } catch (e) {
                throw new DatabaseCreationError();
            }
        });
    }

    update(id) {
        return new Promise(async (resolve) => {
            try {
                const { name, nameLat, inActiveSearch, experienceYears, info, birthDate, address } = this.body;
                const storedApplicant = await Applicant.findByPk(id, { include: includeModelsFull });

                if (storedApplicant) {
                    storedApplicant.name = name;
                    storedApplicant.nameLat = nameLat;
                    storedApplicant.inActiveSearch = inActiveSearch;
                    storedApplicant.experienceYears = experienceYears;
                    storedApplicant.info = info;
                    storedApplicant.birthDate = birthDate;
                    storedApplicant.address = address;
                    this.updatedApplicant = await storedApplicant.save();

                    await new Salary(this.body.salary, this.updatedApplicant).update();
                    await new Education(this.body.education, this.updatedApplicant).update();
                    await new Positions(this.body.positions, this.updatedApplicant).update();
                    await new Skills(this.body.skills, this.updatedApplicant).update();
                    await new WorkPlaces(this.body.workPlaces, this.updatedApplicant).update();
                    await new Regions(this.body.regions, this.updatedApplicant).update();
                    await new LanguageSkills(this.body.languageSkills, this.updatedApplicant).update();
                    await new Photos(this.body.photos, this.updatedApplicant).update();
                    await new Sex(this.body.sex, this.updatedApplicant).update();
                    await new Phones(this.body.phones, this.updatedApplicant).update();
                    await new Emails(this.body.emails, this.updatedApplicant).update();
                    await new Messengers(this.body.messengers, this.updatedApplicant).update();
                    await new Links(this.body.links, this.updatedApplicant).update();
                    await new Files(this.body.files, this.updatedApplicant).update();
                    await new Experiences(this.body.experiences, this.updatedApplicant).update();
                }


                this.updatedApplicant = await Applicant.findByPk(id, { include: includeModelsFull });
                resolve(this.updatedApplicant);
            } catch (e) {
                console.error(e);
                throw new DatabaseCreationError();
            }
        });
    }

    delete(id) {
        return new Promise(async (resolve) => {
            await new Salary().delete(id);
            await new Positions().delete(id);
            await new Skills().delete(id);
            await new WorkPlaces().delete(id);
            await new Regions().delete(id);
            await new LanguageSkills().delete(id);
            await new Photos().delete(id);
            await new Phones().delete(id);
            await new Emails().delete(id);
            await new Messengers().delete(id);
            await new Links().delete(id);
            await new Files().delete(id);
            await new Experiences().delete(id);

            await Applicant.destroy({ where: { id }});

            resolve();
        });
    }
}


module.exports = {
    ApplicantController: ApplicantController,
}