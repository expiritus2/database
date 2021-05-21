const Vacancy = require('../models/vacancy');
const Position = require('../models/vocabulary/position');
const Skill = require('../models/vocabulary/skill');
const Region = require('../models/vocabulary/region');
const User = require('../models/user');
const Company = require('../models/company');
const DatabaseCreationError = require('../errors/database-creation-error');
const { omit } = require('lodash');

class VacancyController {
    constructor(body) {
        this.body = body;
        this.regions = this.body.regions;
        this.skills = this.body.skills;
        this.position = this.body.position;
        this.users = this.body.users;
        this.company = this.body.company;

        this.joinedInfo = omit(this.body, ['regions', 'skills', 'position', 'users']);
    }

    create(options = {}) {
        return new Promise(async (resolve) => {
            try {
                this.newVacancy = await Vacancy.create(this.joinedInfo, options);
                await this.handlePosition(this.position, this.newVacancy);
                await this.handleSkills();
                await this.handleRegions();
                await this.handleUsers();
                await this.handleCompany();

                resolve(this.newVacancy);
            } catch (e) {
                throw new DatabaseCreationError();
            }
        });
    }

    update(id) {
        return new Promise(async (resolve) => {
            try {
                await Vacancy.update(this.joinedInfo, { where: { id } });
                this.newVacancy = await Vacancy.findByPk(id, { include: { all: true } });

                if (this.newVacancy) {
                    await this.handlePosition(this.position, this.newVacancy, true);
                    await this.handleSkills(true);
                    await this.handleRegions(true);
                    await this.handleUsers(true);
                    await this.handleCompany(true);
                }

                resolve(this.newVacancy);
            } catch (e) {
                console.error(e);
                throw new DatabaseCreationError();
            }
        });
    }

    handlePosition(position, parentModel, isUpdate) {
        return new Promise(async (resolve) => {
            await this._findOrCreatePosition(position);

            if (isUpdate) {
                await this._deleteRemovedPosition(position, parentModel);
                await parentModel.setPosition(this.savedPosition);
                await this.savedPosition.addVacancy(parentModel);
            } else {
                await parentModel.setPosition(this.savedPosition);
                await this.savedPosition.addVacancy(parentModel);
            }
            resolve(this.savedPosition);
        });
    }

    handleSkills(isUpdate) {
        return new Promise(async (resolve) => {
            for await (const skill of this.skills) {
                await this._findOrCreateSkill(skill);

                if (isUpdate) {
                    await this._deleteRemovedVacancySkills();
                    await this.newVacancy.addSkill(this.savedSkill);
                } else {
                    await this.newVacancy.addSkill(this.savedSkill);
                }
            }
            resolve(this.savedSkill);
        });
    }

    handleCompany(isUpdate) {
        return new Promise(async (resolve) => {
            this.savedCompany = await Company.findByPk(this.company);

            if (isUpdate) {
                await this.newVacancy.setCompany(this.savedCompany);
            } else {
                await this.newVacancy.setCompany(this.savedCompany);
            }
            resolve();
        });
    }

    handleUsers(isUpdate) {
        return new Promise(async (resolve) => {
            for await (const recruiterId of this.users) {
                this.savedRecruiter = await User.findByPk(recruiterId);

                if (isUpdate) {
                    await this._deleteRemovedUser();
                    await this.newVacancy.addUser(this.savedRecruiter);
                } else {
                    await this.newVacancy.addUser(this.savedRecruiter);
                }
            }
            resolve();
        });
    }

    async _deleteRemovedUser() {
        if (!this.users.includes(this.savedRecruiter.id)) {
            await this.newVacancy.removeUser(this.savedRecruiter);
        }
    }

    async handleRegions(isUpdate) {
        return new Promise(async (resolve) => {
            for await (const region of this.regions) {
                await this._findOrCreateRegion(region);

                if (isUpdate) {
                    await this._deleteRemovedVacancyRegion();
                    await this.newVacancy.addRegion(this.savedRegion);
                } else {
                    await this.newVacancy.addRegion(this.savedRegion);
                }
            }
            resolve(this.savedRegion);
        });
    }

    async _findOrCreateRegion(region) {
        this.savedRegion = await Region.findOne({ where: { value: region.value } });

        if (!this.savedRegion) {
            this.savedRegion = await Region.create(region);
        }
    }

    async _deleteRemovedVacancyRegion() {
        const newRegionsIds = this.regions.map((region) => region.id);
        for await (const prevRegion of this.newVacancy.regions) {
            if (!newRegionsIds.includes(prevRegion.id)) {
                await this.newVacancy.removeRegion(prevRegion);
            }
        }
    }

    async _findOrCreateSkill(skill) {
        this.savedSkill = await Skill.findOne({ where: { value: skill.value } });
        if (!this.savedSkill) {
            this.savedSkill = await Skill.create(skill);
        }
    }

    async _deleteRemovedVacancySkills() {
        for await (const prevSkill of this.newVacancy.skills) {
            const newSkillsIds = this.skills.map((skills) => skills.id);
            if (!newSkillsIds.includes(prevSkill.id)) {
                await this.newVacancy.removeSkill(prevSkill);
            }
        }
    }


    async _findOrCreatePosition(position) {
        this.savedPosition = await Position.findOne({ where: { value: position.value } });
        if (!this.savedPosition) {
            this.savedPosition = await Position.create(position);
        }
    }

    async _deleteRemovedPosition(position, parentModel) {
        for await (const prevPos of parentModel.positions || []) {
            if (prevPos.value !== position.value) {
                await parentModel.removePosition(prevPos);
            }
        }
    }
}


module.exports = {
    VacancyController,
}