class Files {
    constructor(files, vacancy) {
        this.files = files;
        this.vacancy = vacancy;
    }

    create() {
        if (!this.files || !this.files.length) return Promise.resolve();

        return new Promise(async (resolve) => {

            resolve();
        });
    }

    update() {
        if (!this.files || !this.files.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            
            resolve();
        });
    }
}

module.exports = Files;