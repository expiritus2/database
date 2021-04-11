const Vacancy = require('../models/vacancy');
const Position = require('../models/position');
const Skill = require('../models/skill');
const Region = require('../models/region');
const DatabaseCreationError = require('../errors/database-creation-error');
const { omit } = require('lodash');

class VacancyController {
    constructor(body) {
        this.body = body;
        this.regions = this.body.regions;
        this.skills = this.body.skills;
        this.positions = this.body.positions;

        this.joinedInfo = omit(this.body, ['regions', 'skills', 'positions']);
    }

    create(options = {}) {
        return new Promise(async (resolve) => {
            try {
                this.newVacancy = await Vacancy.create(this.joinedInfo, options);
                await this.handlePositions(this.positions, this.newVacancy);
                await this.handleSkills();
                await this.handleRegions();

                resolve(this.newVacancy);
            } catch (e) {
                throw new DatabaseCreationError();
            }
        });
    }

    update(id) {
        return new Promise(async (resolve) => {
            try {
                await Vacancy.update(this.joinedInfo, { where: { id }});
                this.newVacancy = await Vacancy.findByPk(id, { include: { all: true, nested: true }});

                if (this.newVacancy) {
                    await this.handlePositions(this.positions, this.newVacancy, true);
                    await this.handleSkills(true);
                    await this.handleRegions(true);
                }

                resolve(this.newVacancy);
            } catch (e) {
                console.error(e);
                throw new DatabaseCreationError();
            }
        });
    }

    handlePositions(positions, parentModel, isUpdate) {
        return new Promise(async (resolve) => {
            if (positions && !positions.length) {
                await this._deleteRemovedPositions(positions, parentModel);
            }

            for await (const pos of positions) {
                await this._findOrCreatePosition(pos);

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

    async _deleteRemovedPositions(positions, parentModel) {
        for await (const prevPos of parentModel.positions || []) {
            const newPositionsIds = positions.map((position) => position.id);
            if (!newPositionsIds.includes(prevPos.id)) {
                await parentModel.removePosition(prevPos);
            }
        }
    }
}


module.exports = {
    VacancyController,
}