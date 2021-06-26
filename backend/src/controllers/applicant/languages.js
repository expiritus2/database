const LanguageSkillModel = require('../../models/languageSkill');
const ThroughApplicantLanguage = require('../../models/through/applicantLanguage');

class LanguageSkill {
    constructor(languageSkills, applicant) {
        this.languageSkills = languageSkills;
        this.applicant = applicant;
    }

    create() {
        if (!this.languageSkills || !this.languageSkills.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            for await (const languageSkill of this.languageSkills) {
                const languageSkillModel = await this.#createLanguageSkill(languageSkill);

                await this.applicant.addLanguageSkill(languageSkillModel);
            }
            resolve();
        });
    }

    update() {
        if (!this.languageSkills) return Promise.resolve();

        return new Promise(async (resolve) => {
            const newestLanguageSkills = await this.#deleteRemovedLanguageSkills();
            const notChangedLanguageSkills = this.languageSkills.filter((languageSkill) => !!languageSkill.id);

            for await (const languageSkill of newestLanguageSkills) {
                const languageSkillModel = await this.#createLanguageSkill(languageSkill);

                if (languageSkillModel) {
                    await this.applicant.addLanguageSkill(languageSkillModel);
                }
            }

            for await (const notChangedSkill of notChangedLanguageSkills) {
                await LanguageSkillModel.update({
                        languageId: notChangedSkill && notChangedSkill.language && notChangedSkill.language.id ? notChangedSkill.language.id : null,
                        languageLevelId: notChangedSkill.language && notChangedSkill.languageLevel.id ? notChangedSkill.languageLevel.id : null,
                    },
                    {
                        where: { id: notChangedSkill.id }
                    });
            }
            resolve();
        });
    }

    delete(applicantId) {
        return new Promise(async (resolve) => {
            await ThroughApplicantLanguage.destroy({ where: { applicantId }});
            resolve();
        });
    }

    #deleteRemovedLanguageSkills() {
        return new Promise(async (resolve) => {
            const prevLanguageSkillsIds = (this.applicant.languageSkills || []).map((languageSkill) => languageSkill.id);
            const newLanguageSkillsIds = this.languageSkills.map((languageSkill) => languageSkill.id).filter((ls) => !!ls);

            for await (const prevLanguageSkillId of prevLanguageSkillsIds) {
                if (!newLanguageSkillsIds.includes(prevLanguageSkillId)) {
                    await this.applicant.removeLanguageSkill(prevLanguageSkillId);
                    await LanguageSkillModel.destroy({ where: { id: prevLanguageSkillId } })
                }
            }

            const newestLanguageSkills = this.languageSkills.filter((languageSkill) => !languageSkill.id);

            resolve(newestLanguageSkills);
        });
    }

    #createLanguageSkill(languageSkill) {
        return new Promise(async (resolve) => {
            const languageSkillModel = await LanguageSkillModel.create({});

            if (languageSkill.language && languageSkill.language.id) {
                await languageSkillModel.setLanguage(languageSkill.language.id);
            }

            if (languageSkill.languageLevel && languageSkill.languageLevel.id) {
                await languageSkillModel.setLanguageLevel(languageSkill.languageLevel.id);
            }

            resolve(languageSkillModel);
        });
    }
}

module.exports = LanguageSkill;