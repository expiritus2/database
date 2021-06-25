class WorkPlaces {
    constructor(workPlaces, vacancy) {
        this.workPlaces = workPlaces;
        this.vacancy = vacancy;
    }

    create() {
        if (!this.workPlaces || !this.workPlaces.length) return Promise.resolve();

        return new Promise(async (resolve) => {

            resolve();
        });
    }

    update() {
        if (!this.workPlaces || !this.workPlaces.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            
            resolve();
        });
    }
}

module.exports = WorkPlaces;