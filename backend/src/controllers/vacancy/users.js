const ThroughVacancyUser = require('../../models/through/userVacancy');

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
            for await (const user of this.users) {
                if (user.id) {
                    await ThroughVacancyUser.destroy({ where: { userId: user.id }});
                    await this.vacancy.addUser(user.id)
                }
            }
            resolve();
        });
    }
}

module.exports = Users;