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
        this.position = this.body.position;
        this.experience = this.body.experience;

        this.flatProfile = omit(this.body, ['regions', 'skills', 'position', 'experience']);

        this.joinedInfo = { ...this.flatProfile };
    }

    async create() {
        try {
            this.newApplicant = await Applicant.create(this.joinedInfo);
            this.createPosition();
            this.createSkills();
            this.createExperience();
            this.createRegion();

            return this.newApplicant;
        } catch (e) {
            throw new DatabaseCreationError();
        }
    }

    async createPosition() {
        for (const pos of this.position) {
            this.savedPosition = await Position.findOne({ where: { value: pos.value } });
            if (!this.savedPosition) {
                this.savedPosition = await Position.create(pos);
            }

            this.newApplicant.addPosition(this.savedPosition);
        }
    }

    async createSkills() {
        for (const skill of this.skills) {
            this.savedSkill = await Skill.findOne({ where: { value: skill.value } });
            if (!this.savedSkill) {
                this.savedSkill = await Skill.create(skill);
            }

            this.newApplicant.addSkill(this.savedSkill);
        }
    }

    async createExperience() {
        for (const exp of this.experience) {
            this.savedExperience = await Experience.create({
                info: exp.info,
                company: exp.company,
                period: exp.period,
            });

            for (const pos of exp.position) {
                this.savedPosition = await Position.findOne({ where: { value: pos.value } });
                if (!this.savedPosition) {
                    this.savedPosition = await Position.create(pos);
                }
                this.savedExperience.addPosition(this.savedPosition);
                this.newApplicant.addExperience(this.savedExperience);
            }
        }
    }

    async createRegion() {
        for (const region of this.regions) {
            this.savedRegion = await Region.findOne({ where: { value: region.value } });

            if (!this.savedRegion) {
                this.savedRegion = await Region.create(region);
            }
            this.newApplicant.addRegion(this.savedRegion);
        }
    }
}


module.exports = {
    ApplicantController,
}