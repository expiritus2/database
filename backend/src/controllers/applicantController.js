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

        this.flatProfile = omit(this.body, ['regions', 'skills', 'positions', 'experiences']);

        this.joinedInfo = { ...this.flatProfile };
    }

    create(options = {}) {
        return new Promise(async (resolve) => {
            try {
                this.newApplicant = await Applicant.create(this.joinedInfo, options);
                await this.createPosition();
                await this.createSkills();
                await this.createRegion();
                await this.createExperience();

                resolve(this.newApplicant);
            } catch (e) {
                throw new DatabaseCreationError();
            }
        });
    }

    createPosition() {
        return new Promise(async (resolve) => {
            for await (const pos of this.positions) {
                this.savedPosition = await Position.findOne({ where: { value: pos.value } });
                if (!this.savedPosition) {
                    this.savedPosition = await Position.create(pos);
                }

                await this.newApplicant.addPosition(this.savedPosition);
            }
            resolve(this.savedPosition);
        });
    }

    createSkills() {
        return new Promise(async (resolve) => {
            for await (const skill of this.skills) {
                this.savedSkill = await Skill.findOne({ where: { value: skill.value } });
                if (!this.savedSkill) {
                    this.savedSkill = await Skill.create(skill);
                }

                await this.newApplicant.addSkill(this.savedSkill);
            }
            resolve(this.savedSkill);
        });
    }

    createExperience() {
        return new Promise(async (resolve) => {
            for await (const exp of this.experiences) {
                this.savedExperience = await Experience.create(exp);
                await this.newApplicant.addExperience(this.savedExperience);

                for await (const pos of exp.positions) {
                    this.savedPosition = await Position.findOne({ where: { value: pos.value } });
                    if (!this.savedPosition) {
                        this.savedPosition = await Position.create(pos);
                    }
                    await this.savedExperience.addPosition(this.savedPosition);
                }
            }
            resolve(this.savedExperience);
        })
    }

    async createRegion() {
        return new Promise(async (resolve) => {
            for await (const region of this.regions) {
                this.savedRegion = await Region.findOne({ where: { value: region.value } });

                if (!this.savedRegion) {
                    this.savedRegion = await Region.create(region);
                }
                await this.newApplicant.addRegion(this.savedRegion);
            }
            resolve(this.savedRegion);
        });
    }
}


module.exports = {
    ApplicantController,
}