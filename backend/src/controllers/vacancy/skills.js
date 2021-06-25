class Skills {
    constructor(skills, vacancy) {
        this.skills = skills;
        this.vacancy = vacancy;
    }

    create() {
        if (!this.skills || !this.skills.length) return Promise.resolve();

        return new Promise(async (resolve) => {

            resolve();
        });
    }

    update() {
        if (!this.skills || !this.skills.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            
            resolve();
        });
    }
}

module.exports = Skills;