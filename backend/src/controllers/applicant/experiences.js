const Experience = require('../../models/experience');
const ThroughExperiencePosition = require('../../models/through/experiencePosition');

class Experiences {
    constructor(experiences, applicant) {
        this.experiences = experiences;
        this.applicant = applicant;
    }

    create() {
        if (!this.experiences || !this.experiences.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            await this.#createExperiences(this.experiences);
            resolve();
        });
    }

    update() {
        if (!this.experiences || !this.experiences.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            const newestExperiences = await this.#deleteRemovedExperiences();
            await this.#createExperiences(newestExperiences);

            const notChangedExperiences = this.experiences.filter((experience) => !!experience.id);

            for await (const experience of notChangedExperiences) {
                await Experience.update({
                    period: experience && experience.period ? experience.period : [],
                    company: experience && experience.company ? experience.company : '',
                    info: experience && experience.info ? experience.info : '',
                }, { where: { id: experience.id }});


                const prevThroughExperiences = await ThroughExperiencePosition.findAll({ where: { experienceId: experience.id } });
                const newPositionsIds = (experience.positions || []).map((position) => position.id);

                for await (const prevThroughExperience of prevThroughExperiences) {
                    if (!newPositionsIds.includes(prevThroughExperience.positionId)) {
                        await ThroughExperiencePosition.destroy({ where: { positionId: prevThroughExperience.positionId } });
                    }
                }

                for await (const newPosId of newPositionsIds) {
                    const alreadyExistRecord = await ThroughExperiencePosition.findOne({ where: { experienceId: experience.id, positionId: newPosId } });

                    if (!alreadyExistRecord) {
                        await ThroughExperiencePosition.create({
                            experienceId: experience.id,
                            positionId: newPosId,
                        });
                    }
                }
            }
            resolve();
        });
    }

    delete(applicantId) {
        return new Promise(async (resolve) => {
            const experiences = await Experience.findAll({ where: { applicantId }});

            for await (const experience of experiences) {
                await ThroughExperiencePosition.destroy({ where: { experienceId: experience.id }});
                await experience.destroy();
            }
            resolve();
        });
    }

    #createExperiences(experiences) {
        return new Promise(async (resolve) => {
            for await (const experience of experiences) {
                const storedExperience = await Experience.create({
                    period: experience.period,
                    company: experience.company,
                    info: experience.info,
                });

                for await (const position of (experience.positions || [])) {
                    await storedExperience.addPosition(position.id);
                }

                storedExperience.setApplicant(this.applicant);
            }
            resolve();
        });
    }

    #deleteRemovedExperiences() {
        return new Promise(async (resolve) => {
            const prevExperiences = this.applicant.experiences || [];
            const newExperiencesIds = this.experiences.map((experience) => experience.id);

            for await (const prevExperience of prevExperiences) {
                if (!newExperiencesIds.includes(prevExperience.id)) {
                    for await (const position of prevExperience.positions) {
                        await ThroughExperiencePosition.destroy({ where: { experienceId: prevExperience.id }});
                    }

                    await Experience.destroy({ where: { id: prevExperience.id }});
                }
            }

            const newestExperiences = this.experiences.filter((experience) => !experience.id);

            resolve(newestExperiences);
        });
    }
}

module.exports = Experiences;