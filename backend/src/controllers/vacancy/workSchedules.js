class WorkSchedules {
    constructor(workSchedules, vacancy) {
        this.workSchedules = workSchedules;
        this.vacancy = vacancy;
    }

    create() {
        if (!this.workSchedules || !this.workSchedules.length) return Promise.resolve();

        return new Promise(async (resolve) => {

            resolve();
        });
    }

    update() {
        if (!this.workSchedules || !this.workSchedules.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            
            resolve();
        });
    }
}

module.exports = WorkSchedules;