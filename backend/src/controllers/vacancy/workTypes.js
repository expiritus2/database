const ThroughVacancyWorkType = require('../../models/through/vacancyWorkType');

class WorkTypes {
    constructor(workTypes, vacancy) {
        this.workTypes = workTypes;
        this.vacancy = vacancy;
    }

    create() {
        if (!this.workTypes || !this.workTypes.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            for await (const workType of this.workTypes) {
                if (workType && workType.id) {
                    await this.vacancy.addWorkType(workType.id);
                }
            }
            resolve();
        });
    }

    update() {
        if (!this.workTypes) return Promise.resolve();

        return new Promise(async (resolve) => {
            const newestWorkTypesIds = await this.#deleteRemovedWorkTypes(this.vacancy.id);

            for await (const newWorkTypeId of newestWorkTypesIds) {
                await this.vacancy.addWorkType(newWorkTypeId);
            }
            resolve();
        });
    }

    delete(vacancyId) {
        return new Promise(async (resolve) => {
            await ThroughVacancyWorkType.destroy({ where: { vacancyId }});
            resolve();
        });
    }

    #deleteRemovedWorkTypes() {

        return new Promise(async (resolve) => {
            const prevWorkTypesIds = this.vacancy.workTypes.map((workType) => workType.id);
            const newWorkTypesIds = this.workTypes.map((workType) => workType.id);

            for await (const prevWorkTypeId of prevWorkTypesIds) {
                if (!newWorkTypesIds.includes(prevWorkTypeId)) {
                    await this.vacancy.removeWorkType(prevWorkTypeId);
                }
            }

            const newestWorkTypesIds = newWorkTypesIds.filter((newWorkTypeId) => !prevWorkTypesIds.includes(newWorkTypeId));

            resolve(newestWorkTypesIds);
        });
    }
}

module.exports = WorkTypes;