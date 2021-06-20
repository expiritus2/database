class Sex {
    constructor(sex, applicant) {
        this.sex = sex;
        this.applicant = applicant;
    }

    create() {
        if (!this.sex || !this.sex.id) return Promise.resolve();

        return new Promise(async (resolve) => {
            if (this.sex && this.sex.id) {
                await this.applicant.setSex(this.sex.id);
            }
            resolve();
        });
    }

    update() {
        if (!this.sex || !this.sex.id) return Promise.resolve();

        return new Promise(async (resolve) => {
            if (this.sex && this.sex.id) {
                await this.applicant.setSex(this.sex.id);
            }
            resolve();
        });
    }
}

module.exports = Sex;