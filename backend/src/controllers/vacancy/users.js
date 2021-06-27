const ThroughVacancyUser = require('../../models/through/vacancyUser');

class Users {
    constructor(users, vacancy) {
        this.users = users;
        this.vacancy = vacancy;
    }

    create() {
        if (!this.users || !this.users.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            for await (const user of this.users) {
                if (user.id) {
                    await this.vacancy.addUser(user.id)
                }
            }
            resolve();
        });
    }

    update() {
        if (!this.users || !this.users.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            await ThroughVacancyUser.destroy({ where: { vacancyId: this.vacancy.id }});

            for await (const user of this.users) {
                if (user.id) {
                    await this.vacancy.addUser(user.id)
                }
            }
            resolve();
        });
    }

    delete(vacancyId) {
        if (!this.users || !this.users.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            await ThroughVacancyUser.destroy({ where: { vacancyId }});

            resolve();
        });
    }
}

module.exports = Users;