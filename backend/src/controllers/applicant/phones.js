const Phone = require('../../models/phone');

class Phones {
    constructor(phones, applicant) {
        this.phones = phones;
        this.applicant = applicant;
    }

    create() {
        if (!this.phones || !this.phones.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            for await (const phone of this.phones) {
                await this.#createPhone(phone)
            }
            resolve();
        });
    }

    update() {
        if (!this.phones || !this.phones.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            const newestPhones = await this.#deleteRemovedPhones();
            for await (const phone of newestPhones) {
                await this.#createPhone(phone);
            }

            const notChangedPhones = this.phones.filter((phone) => !!phone.id);
            for await (const phone of notChangedPhones) {
                await Phone.update({
                    phoneTypeId: phone && phone.phoneType && phone.phoneType.id ? phone.phoneType.id : null,
                    number: phone && phone.number ? phone.number : null,
                }, { where: { id: phone.id } })
            }
            resolve();
        });
    }

    // async handlePhones(isUpdate) {
    //     const { phones = [] } = this.body;
    //
    //     return new Promise(async (resolve) => {
    //         if (isUpdate) {
    //             const newestPhones = await this.#deleteRemovedPhones(this.updatedApplicant.id);
    //             for await (const phone of newestPhones) {
    //                 await this.#createPhone(phone, this.updatedApplicant);
    //             }
    //
    //             const notChangedPhones = phones.filter((phone) => !!phone.id);
    //             for await (const phone of notChangedPhones) {
    //                 await Phone.update({
    //                     phoneTypeId: phone && phone.phoneType && phone.phoneType.id ? phone.phoneType.id : null,
    //                     number: phone && phone.number ? phone.number : null,
    //                 }, { where: { id: phone.id } })
    //             }
    //         } else {
    //             for await (const phone of phones) {
    //                 await this.#createPhone(phone, this.newApplicant)
    //             }
    //         }
    //
    //         resolve();
    //     });
    // }

    #createPhone(phone) {
        return new Promise(async (resolve) => {
            const newPhone = await Phone.create({ number: phone.number });

            if (phone.phoneType && phone.phoneType.id) {
                newPhone.setPhoneType(phone.phoneType.id);
            }

            newPhone.setApplicant(this.applicant);
            resolve(newPhone);
        });
    }

    #deleteRemovedPhones() {
        return new Promise(async (resolve) => {
            // const prevStoredPhones = await Phone.findAll({ where: { applicantId: applicantId } });
            const prevStoredPhones = this.applicant.phones || [];
            const newPhonesIds = this.phones.filter((phone) => !!phone.id).map((ph) => ph.id);

            for await (const prevStoredPhone of prevStoredPhones) {
                if (!newPhonesIds.includes(prevStoredPhone.id)) {
                    await Phone.destroy({ where: { id: prevStoredPhone.id } });
                }
            }

            const newestPhones = this.phones.filter((phone) => !phone.id);

            resolve(newestPhones);
        });
    }
}

module.exports = Phones;