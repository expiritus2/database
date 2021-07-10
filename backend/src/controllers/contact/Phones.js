const Phone = require('../../models/phone');

class Phones {
    constructor(phones, contact) {
        this.phones = phones;
        this.contact = contact;
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
        if (!this.phones) return Promise.resolve();

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

    delete(contactId) {
        return new Promise(async (resolve) => {
            await Phone.destroy({ where: { contactId }});
            resolve();
        });
    }

    #createPhone(phone) {
        return new Promise(async (resolve) => {
            const newPhone = await Phone.create({ number: phone.number });

            if (phone.phoneType && phone.phoneType.id) {
                newPhone.setPhoneType(phone.phoneType.id);
            }

            newPhone.setContact(this.contact);
            resolve(newPhone);
        });
    }

    #deleteRemovedPhones() {
        return new Promise(async (resolve) => {
            // const prevStoredPhones = await Phone.findAll({ where: { contactId: contactId } });
            const prevStoredPhones = this.contact.phones || [];
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