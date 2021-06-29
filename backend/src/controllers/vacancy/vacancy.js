const Vacancy = require('../../models/vacancy');
const DatabaseCreationError = require('../../errors/database-creation-error');

const Position = require('./position');
const Users = require('./users');
const SalaryRange = require('./salaryRange');
const Skills = require('./skills');
const WorkPlaces = require('./workPlaces');
const Regions = require('./regions');
const WorkSchedules = require('./workSchedules');
const WorkTypes = require('./workTypes');
const Files = require('./files');
const Company = require('./company');
const Contacts = require('./contacts');

const { includeModelsFull, includeModelsLight, attributesLight } = require('../../settings/vacancy');

class VacancyController {
    constructor(body) {
        this.body = body;
    }

    create(options = {}) {
        return new Promise(async (resolve) => {
            try {
                const { active, experienceYears, info } = this.body;
                const config  = { active, experienceYears, info };
                this.newVacancy = await Vacancy.create(config, options);

                await new Position(this.body.position, this.newVacancy).create();
                await new Users(this.body.users, this.newVacancy).create();
                await new Company(this.body.company, this.newVacancy).create();
                await new SalaryRange(this.body.salaryRange, this.newVacancy).create();
                await new Skills(this.body.skills, this.newVacancy).create();
                await new WorkPlaces(this.body.workPlaces, this.newVacancy).create();
                await new Regions(this.body.regions, this.newVacancy).create();
                await new WorkSchedules(this.body.workSchedules, this.newVacancy).create();
                await new WorkTypes(this.body.workTypes, this.newVacancy).create();
                await new Files(this.body.files, this.newVacancy).create();
                await new Contacts(this.body.contacts, this.newVacancy).create();

                this.newVacancy = await Vacancy.findByPk(this.newVacancy.id, { include: includeModelsLight, attributes: attributesLight })

                resolve(this.newVacancy);
            } catch (e) {
                throw new DatabaseCreationError();
            }
        });
    }

    update(id) {
        return new Promise(async (resolve) => {
            try {
                const { active, experienceYears, info } = this.body;
                const storedVacancy = await Vacancy.findByPk(id, { include: includeModelsFull });

                if (storedVacancy) {
                    storedVacancy.active = active;
                    storedVacancy.experienceYears = experienceYears;
                    storedVacancy.info = info;
                    this.updatedVacancy = await storedVacancy.save();

                    await new Position(this.body.position, this.updatedVacancy).update();
                    await new Users(this.body.users, this.updatedVacancy).update();
                    await new Company(this.body.company, this.updatedVacancy).update();
                    await new SalaryRange(this.body.salaryRange, this.updatedVacancy).update();
                    await new Skills(this.body.skills, this.updatedVacancy).update();
                    await new WorkPlaces(this.body.workPlaces, this.updatedVacancy).update();
                    await new Regions(this.body.regions, this.updatedVacancy).update();
                    await new WorkSchedules(this.body.workSchedules, this.updatedVacancy).update();
                    await new WorkTypes(this.body.workTypes, this.updatedVacancy).update();
                    await new Files(this.body.files, this.updatedVacancy).update();
                    await new Contacts(this.body.contacts, this.updatedVacancy).update();
                }

                this.updatedVacancy = await Vacancy.findByPk(id, { include: includeModelsFull });
                resolve(this.updatedVacancy);
            } catch (e) {
                console.error(e);
                throw new DatabaseCreationError();
            }
        });
    }

    delete(id) {
        return new Promise(async (resolve) => {
            await new Users().delete(id);
            await new SalaryRange().delete(id);
            await new Skills().delete(id);
            await new WorkPlaces().delete(id);
            await new Regions().delete(id);
            await new WorkSchedules().delete(id);
            await new Files().delete(id);
            await new Contacts().delete(id);

            await Vacancy.destroy({ where: { id }});

            resolve();
        });
    }
}


module.exports = {
    VacancyController,
}