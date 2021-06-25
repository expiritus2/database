class Regions {
    constructor(regions, vacancy) {
        this.regions = regions;
        this.vacancy = vacancy;
    }

    create() {
        if (!this.regions || !this.regions.length) return Promise.resolve();

        return new Promise(async (resolve) => {

            resolve();
        });
    }

    update() {
        if (!this.regions || !this.regions.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            
            resolve();
        });
    }
}

module.exports = Regions;