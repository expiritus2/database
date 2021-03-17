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
        this.profile = this.body.profile;
        this.files = this.body.files;
        this.info = this.body.info;
        this.experience = this.body.experience;
        this.phones = this.info.phones;
        this.regions = this.profile.regions;
        this.skills = this.profile.skills;
        this.position = this.profile.position;

        this.flatProfile = omit(this.profile, ['regions', 'skills', 'position']);

        this.joinedInfo = { ...this.flatProfile, ...this.info, files: this.files };
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

            this.savedExperience.setApplicant(this.newApplicant);

            for (const pos of exp.position) {
                this.savedPosition = await Position.findOne({ where: { value: pos.value } });
                if (!this.savedPosition) {
                    this.savedPosition = await Position.create(pos);
                }
                this.savedExperience.addPosition(this.savedPosition);
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