class Salary {
    constructor(salary, vacancy) {
        this.salary = salary;
        this.vacancy = vacancy;
    }

    create() {
        if (!this.salary) return Promise.resolve();

        return new Promise(async (resolve) => {

            resolve();
        });
    }

    update() {
        if (!this.salary) return Promise.resolve();

        return new Promise(async (resolve) => {
            
            resolve();
        });
    }
}

module.exports = Salary;