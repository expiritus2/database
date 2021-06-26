const Email = require('../../models/email');

class Emails {
    constructor(emails, applicant) {
        this.emails = emails;
        this.applicant = applicant;
    }

    create() {
        if (!this.emails || !this.emails.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            for await (const email of this.emails) {
                if (email && email.email) {
                    await this.#createEmail(email.email);
                }
            }
            resolve();
        })
    }

    update() {
        if (!this.emails) return Promise.resolve();

        return new Promise(async (resolve) => {
            const newestEmails = await this.#deleteRemovedEmails(this.applicant.id);
            for await (const newEmail of newestEmails) {
                if (newEmail && newEmail.email) {
                    await this.#createEmail(newEmail.email);
                }
            }

            const notChangedEmails = this.emails.filter((phone) => !!phone.id);
            for await (const notChangedEmail of notChangedEmails) {
                if (notChangedEmail && notChangedEmail.email && notChangedEmails.id) {
                    await Email.update({ email: notChangedEmail.email }, { where: { id: notChangedEmail.id } })
                }
            }
            resolve();
        })
    }

    delete(applicantId) {
        return new Promise(async (resolve) => {
            await Email.destroy({ where: { applicantId }});
            resolve();
        });
    }

    #deleteRemovedEmails() {
        return new Promise(async (resolve) => {
            const prevStoredEmails = this.applicant.emails || [];
            const newEmailsIds = this.emails.filter((email) => !!email.id).map((em) => em.id);

            for await (const prevStoredEmail of prevStoredEmails) {
                if (!newEmailsIds.includes(prevStoredEmail.id)) {
                    await Email.destroy({ where: { id: prevStoredEmail.id } });
                }
            }

            const newestEmails = this.emails.filter((email) => !email.id);

            resolve(newestEmails);
        });
    }

    #createEmail(email) {
        return new Promise(async (resolve) => {
            const newEmail = await Email.create({ email });
            newEmail.setApplicant(this.applicant);
            resolve();
        });
    }
}

module.exports = Emails;