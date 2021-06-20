const LanguageSkill = require('../../models/languageSkill');

class Languages {
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
        if (!this.languageSkills || !this.languageSkills.length) return Promise.resolve();

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
                await LanguageSkill.update({
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

    // async handleLanguages(isUpdate) {
    //     return new Promise(async (resolve) => {
    //         const { languageSkills = [] } = this.body;
    //
    //         if (isUpdate) {
    //             const newestLanguageSkills = await this.#deleteRemovedLanguageSkills(this.updatedApplicant.id);
    //             const notChangedLanguageSkills = languageSkills.filter((languageSkill) => !!languageSkill.id);
    //
    //             for await (const languageSkill of newestLanguageSkills) {
    //                 const storedLanguageSkill = await this.#createLanguageSkill(languageSkill);
    //
    //                 if (storedLanguageSkill) {
    //                     await this.updatedApplicant.addLanguageSkill(storedLanguageSkill);
    //                 }
    //             }
    //
    //             for await (const notChangedSkill of notChangedLanguageSkills) {
    //                 await LanguageSkill.update({
    //                         languageId: notChangedSkill && notChangedSkill.language && notChangedSkill.language.id ? notChangedSkill.language.id : null,
    //                         languageLevelId: notChangedSkill.language && notChangedSkill.languageLevel.id ? notChangedSkill.languageLevel.id : null,
    //                     },
    //                     {
    //                         where: { id: notChangedSkill.id }
    //                     });
    //             }
    //         } else {
    //             for await (const languageSkill of languageSkills) {
    //                 const storedLanguageSkill = await this.#createLanguageSkill(languageSkill);
    //
    //                 await this.newApplicant.addLanguageSkill(storedLanguageSkill);
    //             }
    //         }
    //
    //         resolve();
    //     });
    // }

    #deleteRemovedLanguageSkills() {
        return new Promise(async (resolve) => {
            const prevLanguageSkillsIds = (this.applicant.languageSkills || []).map((languageSkill) => languageSkill.id);
            const newLanguageSkillsIds = this.languageSkills.map((languageSkill) => languageSkill.id).filter((ls) => !!ls);

            for await (const prevLanguageSkillId of prevLanguageSkillsIds) {
                if (!newLanguageSkillsIds.includes(prevLanguageSkillId)) {
                    await this.applicant.removeLanguageSkill(prevLanguageSkillId);
                    await LanguageSkill.destroy({ where: { id: prevLanguageSkillId } })
                }
            }

            const newestLanguageSkills = this.languageSkills.filter((languageSkill) => !languageSkill.id);

            resolve(newestLanguageSkills);
        });
    }

    #createLanguageSkill(languageSkill) {
        return new Promise(async (resolve) => {
            const languageSkillModel = await LanguageSkill.create({});

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

module.exports = Languages;