const ThroughVacancySkill = require('../../models/through/vacancySkill');

class Skills {
    constructor(skills, vacancy) {
        this.skills = skills;
        this.vacancy = vacancy;
    }

    create() {
        if (!this.skills || !this.skills.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            for await (const skill of this.skills) {
                if (skill && skill.id) {
                    await this.vacancy.addSkill(skill.id);
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
                await this.vacancy.addSkill(newSkillId);
            }
            resolve();
        });
    }

    delete(vacancyId) {
        return new Promise(async (resolve) => {
            await ThroughVacancySkill.destroy({ where: { vacancyId }})
            resolve();
        });
    }

    #deleteRemovedSkills(vacancyId) {
        return new Promise(async (resolve) => {
            const prevSkillsIds = this.vacancy.skills.map((skill) => skill.id) || [];
            const newSkillsIds = this.skills.map((skill) => skill.id);

            for await (const prevSkillId of prevSkillsIds) {
                if (!newSkillsIds.includes(prevSkillId)) {
                    await this.vacancy.removeSkill(prevSkillId);
                }
            }

            const newestPositionsIds = newSkillsIds.filter((newPosId) => !prevSkillsIds.includes(newPosId));

            resolve(newestPositionsIds);
        });
    }
}

module.exports = Skills;