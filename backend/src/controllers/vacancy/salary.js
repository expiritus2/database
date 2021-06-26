const SalaryRange = require('../../models/salaryRange');

class Salary {
    constructor(salary, vacancy) {
        this.salary = salary;
        this.vacancy = vacancy;
    }

    create() {
        if (!this.salary) return Promise.resolve();

        return new Promise(async (resolve) => {
            await this.#createSalaryModel();

            if (this.createdSalary) {
                this.createdSalary.setVacancy(this.vacancy);
            }
            resolve();
        });
    }

    update() {
        if (!this.salary) return Promise.resolve();

        return new Promise(async (resolve) => {
            this.storedVacancySalary = await SalaryRange.findOne({ where: { vacancyId: this.vacancy.id } });
            if (!this.storedVacancySalary) {
                await this.create();
            } else {
                await SalaryRange.update({
                        min: this.salary && this.salary.min ? this.salary.min : '',
                        max: this.salary && this.salary.max ? this.salary.max : '',
                        currencyId: this.salary && this.salary.currency && this.salary.currency.id ? this.salary.currency.id : null,
                    },
                    { where: { vacancyId: this.vacancy.id } }
                );
            }
            resolve();
        });
    }

    delete(vacancyId) {
        return new Promise(async (resolve) => {
            await SalaryRange.destroy({ where: { vacancyId }});
            resolve();
        });
    }

    #createSalaryModel() {
        return new Promise(async (resolve) => {
            if (this.salary && (this.salary.min || this.salary.max)) {
                this.createdSalary = await SalaryRange.create({ min: this.salary.min, max: this.salary.max });
            }

            if (this.salary && this.salary.currency && this.salary.currency.id) {
                await this.createdSalary.setCurrency(this.salary.currency.id);
            }

            resolve();
        });
    }
}

module.exports = Salary;