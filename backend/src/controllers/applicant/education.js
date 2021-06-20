class Education {
    constructor(education, applicant) {
        this.education = education;
        this.applicant = applicant;
    }

    create() {
        if (!this.education) return Promise.resolve();

        return new Promise(async (resolve) => {
            if (this.education && this.education.id) {
                await this.applicant.setEducation(this.education.id);
            }
            resolve();
        });
    }

    update() {
        if (!this.education) return Promise.resolve();

        return new Promise(async (resolve) => {
            if (this.education && this.education.id) {
                await this.applicant.update({ educationId: this.education.id });
            }
            resolve();
        });
    }
}

module.exports = Education;