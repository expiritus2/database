const ThroughVacancyUser = require('../../models/through/vacancyUser');
const BadRequestError = require('../../errors/bad-request-error');

class Users {
    constructor(users, vacancy) {
        this.users = users;
        this.vacancy = vacancy;
    }

    create() {
        if (!this.users || !this.users.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            try {
                for await (const user of this.users) {
                    if (user.id) {
                        await this.vacancy.addUser(user.id)
                    }
                }
                resolve();
            } catch (err) {
                throw new BadRequestError('Cant create users in vacancy', err);
            }
        });
    }

    update() {
        if (!this.users || !this.users.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            try {
                await ThroughVacancyUser.destroy({ where: { vacancyId: this.vacancy.id }});

                for await (const user of this.users) {
                    if (user.id) {
                        await this.vacancy.addUser(user.id)
                    }
                }
                resolve();
            } catch (err) {
                throw new BadRequestError('Cant update users in vacancy', err);
            }
        });
    }

    delete(vacancyId) {
        if (!this.users || !this.users.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            try {
                await ThroughVacancyUser.destroy({ where: { vacancyId }});

                resolve();
            } catch (err) {
                throw new BadRequestError('Cant delete users in vacancy', err);
            }
        });
    }
}

module.exports = Users;