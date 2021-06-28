class Sex {
    constructor(sex, contact) {
        this.sex = sex;
        this.contact = contact;
    }

    create() {
        if (!this.sex || !this.sex.id) return Promise.resolve();

        return new Promise(async (resolve) => {
            if (this.sex && this.sex.id) {
                await this.contact.setSex(this.sex.id);
            }
            resolve();
        });
    }

    update() {
        if (!this.sex || !this.sex.id) return Promise.resolve();

        return new Promise(async (resolve) => {
            if (this.sex && this.sex.id) {
                await this.contact.setSex(this.sex.id);
            }
            resolve();
        });
    }

    delete(contactId) {
        return new Promise(async (resolve) => {

            resolve();
        });
    }
}

module.exports = Sex;