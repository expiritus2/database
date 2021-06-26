const ThroughApplicantSkill = require('../../models/through/applicantSkill');

class Skills {
    constructor(skills, applicant) {
        this.skills = skills;
        this.applicant = applicant;
    }

    create() {
        if (!this.skills || !this.skills.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            for await (const skill of this.skills) {
                if (skill && skill.id) {
                    await this.applicant.addSkill(skill.id);
                }
            }
            resolve();
        });
    }

    update() {
        if (!this.skills) return Promise.resolve();

        return new Promise(async (resolve) => {
            const newestSkillsIds = await this.#deleteRemovedSkills();

            for await (const newSkillId of newestSkillsIds) {
                await this.applicant.addSkill(newSkillId);
            }
            resolve();
        });
    }

    delete(applicantId) {
        return new Promise(async (resolve) => {
            await ThroughApplicantSkill.destroy({ where: { applicantId }})
            resolve();
        });
    }

    #deleteRemovedSkills(applicantId) {
        return new Promise(async (resolve) => {
            const prevSkillsIds = this.applicant.skills.map((skill) => skill.id) || [];
            const newSkillsIds = this.skills.map((skill) => skill.id);

            for await (const prevSkillId of prevSkillsIds) {
                if (!newSkillsIds.includes(prevSkillId)) {
                    await this.applicant.removeSkill(prevSkillId);
                }
            }

            const newestPositionsIds = newSkillsIds.filter((newPosId) => !prevSkillsIds.includes(newPosId));

            resolve(newestPositionsIds);
        });
    }
}

module.exports = Skills;