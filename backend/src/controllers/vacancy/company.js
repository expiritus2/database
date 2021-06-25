class Company {
    constructor(company, vacancy) {
        this.company = company;
        this.vacancy = vacancy;
    }

    create() {
        if (!this.company) return Promise.resolve();

        return new Promise(async (resolve) => {

            resolve();
        });
    }

    update() {
        if (!this.company) return Promise.resolve();

        return new Promise(async (resolve) => {

            resolve();
        });
    }
}

module.exports = Company;