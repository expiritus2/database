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
                await this.handlePosition();
                await this.handleSkills();
                await this.handleRegion();
                await this.createExperience();

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
                    await this.handlePosition(true);
                    await this.handleSkills(true);
                    await this.handleRegion(true);
                    await this.createExperience(true);
                }

                resolve(this.newApplicant);
            } catch (e) {
                console.error(e);
                throw new DatabaseCreationError();
            }
        });
    }

    handlePosition(isUpdate) {
        return new Promise(async (resolve) => {
            for await (const pos of this.positions) {
                this.savedPosition = await Position.findOne({ where: { value: pos.value } });
                if (!this.savedPosition) {
                    this.savedPosition = await Position.create(pos);
                }

                if (isUpdate) {
                    for await (const prevPos of this.newApplicant.positions) {
                        const newPositionsIds = this.positions.map((position) => position.id);
                        if (!newPositionsIds.includes(prevPos.id)) {
                            await this.newApplicant.removePosition(prevPos);
                        }
                    }

                    await this.newApplicant.addPosition(this.savedPosition);
                } else {
                    await this.newApplicant.addPosition(this.savedPosition);
                }
            }
            resolve(this.savedPosition);
        });
    }

    handleSkills(isUpdate) {
        return new Promise(async (resolve) => {
            for await (const skill of this.skills) {
                this.savedSkill = await Skill.findOne({ where: { value: skill.value } });
                if (!this.savedSkill) {
                    this.savedSkill = await Skill.create(skill);
                }

                if (isUpdate) {
                    for await (const prevSkill of this.newApplicant.skills) {
                        const newSkillsIds = this.skills.map((skills) => skills.id);
                        if (!newSkillsIds.includes(prevSkill.id)) {
                            await this.newApplicant.removeSkill(prevSkill);
                        }
                    }

                    await this.newApplicant.addSkill(this.savedSkill);
                } else {
                    await this.newApplicant.addSkill(this.savedSkill);
                }
            }
            resolve(this.savedSkill);
        });
    }

    async handleRegion(isUpdate) {
        return new Promise(async (resolve) => {
            for await (const region of this.regions) {
                this.savedRegion = await Region.findOne({ where: { value: region.value } });

                if (!this.savedRegion) {
                    this.savedRegion = await Region.create(region);
                }

                if (isUpdate) {
                    for await (const prevRegion of this.newApplicant.regions) {
                        const newRegionsIds = this.regions.map((region) => region.id);
                        if (!newRegionsIds.includes(prevRegion.id)) {
                            await this.newApplicant.removeRegion(prevRegion);
                        }
                    }
                    await this.newApplicant.addRegion(this.savedRegion);
                } else {
                    await this.newApplicant.addRegion(this.savedRegion);
                }
            }
            resolve(this.savedRegion);
        });
    }

    createExperience(isUpdate) {
        return new Promise(async (resolve) => {
            for await (const exp of this.experiences) {
                this.savedExperience = await Experience.findOne({ where: { applicantId: this.newApplicant.id }});

                if (!this.savedExperience) {
                    this.savedExperience = await Experience.create(exp);
                    await this.savedExperience.setApplicant(this.newApplicant);
                }

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
    }v
}


module.exports = {
    ApplicantController,
}