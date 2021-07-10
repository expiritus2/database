class Company {
    constructor(company, vacancy) {
        this.company = company;
        this.vacancy = vacancy;
    }

    create() {
        if (!this.company || !this.company.id) return Promise.resolve();

        return new Promise(async (resolve) => {
            await this.vacancy.setCompany(this.company.id)
            resolve();
        });
    }

    update() {
        if (!this.company || !this.company.id) return Promise.resolve();

        return new Promise(async (resolve) => {
            await this.vacancy.setCompany(this.company.id);
            resolve();
        });
    }
}

module.exports = Company;