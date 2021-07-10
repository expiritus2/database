const ThroughVacancyWorkSchedule = require('../../models/through/vacancyWorkSchedule');

class WorkSchedules {
    constructor(workSchedules, vacancy) {
        this.workSchedules = workSchedules;
        this.vacancy = vacancy;
    }

    create() {
        if (!this.workSchedules || !this.workSchedules.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            for await (const workSchedule of this.workSchedules) {
                if (workSchedule && workSchedule.id) {
                    await this.vacancy.addWorkSchedule(workSchedule.id);
                }
            }
            resolve();
        });
    }

    update() {
        if (!this.workSchedules) return Promise.resolve();

        return new Promise(async (resolve) => {
            const newestWorkSchedulesIds = await this.#deleteRemovedWorkSchedules(this.vacancy.id);

            for await (const newWorkScheduleId of newestWorkSchedulesIds) {
                await this.vacancy.addWorkSchedule(newWorkScheduleId);
            }
            resolve();
        });
    }

    delete(vacancyId) {
        return new Promise(async (resolve) => {
            await ThroughVacancyWorkSchedule.destroy({ where: { vacancyId }});
            resolve();
        });
    }

    #deleteRemovedWorkSchedules() {

        return new Promise(async (resolve) => {
            const prevWorkSchedulesIds = this.vacancy.workSchedules.map((workSchedule) => workSchedule.id);
            const newWorkSchedulesIds = this.workSchedules.map((workSchedule) => workSchedule.id);

            for await (const prevWorkScheduleId of prevWorkSchedulesIds) {
                if (!newWorkSchedulesIds.includes(prevWorkScheduleId)) {
                    await this.vacancy.removeWorkSchedule(prevWorkScheduleId);
                }
            }

            const newestWorkSchedulesIds = newWorkSchedulesIds.filter((newWorkScheduleId) => !prevWorkSchedulesIds.includes(newWorkScheduleId));

            resolve(newestWorkSchedulesIds);
        });
    }
}

module.exports = WorkSchedules;