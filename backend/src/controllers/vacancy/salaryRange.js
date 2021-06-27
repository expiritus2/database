const SalaryRangeModel = require('../../models/salaryRange');

class SalaryRange {
    constructor(salaryRange, vacancy) {
        this.salaryRange = salaryRange;
        this.vacancy = vacancy;
    }

    create() {
        if (!this.salaryRange) return Promise.resolve();

        return new Promise(async (resolve) => {
            await this.#createSalaryModel();

            if (this.createdSalary) {
                this.createdSalary.setVacancy(this.vacancy);
            }
            resolve();
        });
    }

    update() {
        if (!this.salaryRange) return Promise.resolve();

        return new Promise(async (resolve) => {
            this.storedVacancySalary = await SalaryRangeModel.findOne({ where: { vacancyId: this.vacancy.id } });
            if (!this.storedVacancySalary) {
                await this.create();
            } else {
                await SalaryRangeModel.update({
                        min: this.salaryRange && this.salaryRange.min ? this.salaryRange.min : '',
                        max: this.salaryRange && this.salaryRange.max ? this.salaryRange.max : '',
                        currencyId: this.salaryRange && this.salaryRange.currency && this.salaryRange.currency.id ? this.salaryRange.currency.id : null,
                    },
                    { where: { vacancyId: this.vacancy.id } }
                );
            }
            resolve();
        });
    }

    delete(vacancyId) {
        return new Promise(async (resolve) => {
            await SalaryRangeModel.destroy({ where: { vacancyId }});
            resolve();
        });
    }

    #createSalaryModel() {
        return new Promise(async (resolve) => {
            if (this.salaryRange && (this.salaryRange.min || this.salaryRange.max)) {
                this.createdSalary = await SalaryRangeModel.create({ min: this.salaryRange.min, max: this.salaryRange.max });
            }

            if (this.salaryRange && this.salaryRange.currency && this.salaryRange.currency.id) {
                await this.createdSalary.setCurrency(this.salaryRange.currency.id);
            }

            resolve();
        });
    }
}

module.exports = SalaryRange;