class Company {
    constructor(company, contact) {
        this.company = company;
        this.contact = contact;
    }

    create() {
        if (!this.company || !this.company.id) return Promise.resolve();

        return new Promise(async (resolve) => {
            await this.contact.setCompany(this.company.id)
            resolve();
        });
    }

    update() {
        if (!this.company || !this.company.id) return Promise.resolve();

        return new Promise(async (resolve) => {
            await this.contact.setCompany(this.company.id);
            resolve();
        });
    }
}

module.exports = Company;