const SalaryModel = require('../../models/salary');

class Salary {
    constructor(salary, applicant) {
        this.salary = salary;
        this.applicant = applicant;
    }

    create() {
        if (!this.salary) return Promise.resolve();

        return new Promise(async (resolve) => {
            await this.#createSalaryModel();

            if (this.createdSalary) {
                this.createdSalary.setApplicant(this.applicant)
            }
            resolve();
        });
    }

    update() {
        if (!this.salary) return Promise.resolve();

        return new Promise(async (resolve) => {
            this.storedApplicantSalary = await SalaryModel.findOne({ where: { applicantId: this.applicant.id } });
            if (!this.storedApplicantSalary) {
                await this.create();
            } else {
                await SalaryModel.update({
                        amount: this.salary && this.salary.amount ? this.salary.amount : '',
                        currencyId: this.salary && this.salary.currency && this.salary.currency.id ? this.salary.currency.id : null,
                    },
                    { where: { applicantId: this.applicant.id } }
                );
            }
            resolve();
        });
    }

    #createSalaryModel() {
        return new Promise(async (resolve) => {
            if (this.salary && this.salary.amount) {
                this.createdSalary = await SalaryModel.create({ amount: this.salary.amount });
            }

            if (this.salary && this.salary.currency && this.salary.currency.id) {
                await this.createdSalary.setCurrency(this.salary.currency.id);
            }

            resolve();
        });
    }
}

module.exports = Salary;