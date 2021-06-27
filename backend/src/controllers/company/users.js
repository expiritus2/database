const ThroughCompanyUser = require('../../models/through/companyUser');

class Users {
    constructor(users, company) {
        this.users = users;
        this.company = company;
    }

    create() {
        if (!this.users || !this.users.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            for await (const user of this.users) {
                if (user.id) {
                    await this.company.addUser(user.id)
                }
            }
            resolve();
        });
    }

    update() {
        if (!this.users || !this.users.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            await ThroughCompanyUser.destroy({ where: { companyId: this.company.id }});

            for await (const user of this.users) {
                if (user.id) {
                    await this.company.addUser(user.id)
                }
            }
            resolve();
        });
    }

    delete(companyId) {
        if (!this.users || !this.users.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            await ThroughCompanyUser.destroy({ where: { companyId }});

            resolve();
        });
    }
}

module.exports = Users;