const Applicant = require('../models/applicant');
const Position = require('../models/position');
const Skill = require('../models/skill');
const Experience = require('../models/experience');
const Region = require('../models/region');
const DatabaseCreationError = require('../errors/database-creation-error');
const { omit } = require('lodash');

class ApplicantController {
    constructor(body) {
        this.body = body;
        this.regions = this.body.regions;
        this.skills = this.body.skills;
        this.positions = this.body.positions;
        this.experiences = this.body.experiences;

        this.joinedInfo = omit(this.body, ['regions', 'skills', 'positions', 'experiences']);
    }

    create(options = {}) {
        return new Promise(async (resolve) => {
            try {
                this.newApplicant = await Applicant.create(this.joinedInfo, options);
                await this.handlePositions(this.positions, this.newApplicant);
                await this.handleSkills();
                await this.handleRegions();
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
                await Applicant.update(this.joinedInfo, { where: { id }});
                this.newApplicant = await Applicant.findByPk(id, { include: { all: true, nested: true }});

                if (this.newApplicant) {
                    await this.handlePositions(this.positions, this.newApplicant, true);
                    await this.handleSkills(true);
                    await this.handleRegions(true);
                    await this.handleExperiences(true);
                }

                resolve(this.newApplicant);
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
                await this._findOrCreateRegion(region);

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

    async _findOrCreateRegion(region) {
        this.savedRegion = await Region.findOne({ where: { value: region.value } });

        if (!this.savedRegion) {
            this.savedRegion = await Region.create(region);
        }
    }

    async _deleteRemovedApplicantRegion() {
        const newRegionsIds = this.regions.map((region) => region.id);
        for await (const prevRegion of this.newApplicant.regions) {
            if (!newRegionsIds.includes(prevRegion.id)) {
                await this.newApplicant.removeRegion(prevRegion);
            }
        }
    }

    async _findOrCreateSkill(skill) {
        this.savedSkill = await Skill.findOne({ where: { value: skill.value } });
        if (!this.savedSkill) {
            this.savedSkill = await Skill.create(skill);
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

    async _deleteRemovedApplicantExperience() {
        const savedExperiences = await Experience.findAll({ where: { applicantId: this.newApplicant.id }});
        const newExperiencesIds = this.experiences.map((experience) => experience.id);
        for await (const prevExperience of savedExperiences) {
            if (!newExperiencesIds.includes(prevExperience.id)) {
                await Experience.destroy({ where: { id: prevExperience.id }});
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
            this.savedExperience = await Experience.findByPk(expInfo.id, { include: { all: true, nested: true }});
            await this.handlePositions(experience.positions, this.savedExperience, true);
        }
    }
}


module.exports = {
    ApplicantController,
}