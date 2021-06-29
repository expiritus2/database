const ThroughVacancyContact = require('../../models/through/vacancyContact');

class Contacts {
    constructor(contacts, vacancy) {
        this.contacts = contacts;
        this.vacancy = vacancy;
    }

    create() {
        if (!this.contacts || !this.contacts.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            for await (const contact of this.contacts) {
                if (contact && contact.id) {
                    await this.vacancy.addContact(contact.id);
                }
            }
            resolve();
        });
    }

    update() {
        if (!this.contacts) return Promise.resolve();

        return new Promise(async (resolve) => {
            const newestContactsIds = await this.#deleteRemovedContacts();

            for await (const newContactId of newestContactsIds) {
                await this.vacancy.addContact(newContactId);
            }
            resolve();
        });
    }

    delete(vacancyId) {
        return new Promise(async (resolve) => {
            await ThroughVacancyContact.destroy({ where: { vacancyId }})
            resolve();
        });
    }

    #deleteRemovedContacts() {
        return new Promise(async (resolve) => {
            const prevContactsIds = this.vacancy.contacts.map((contact) => contact.id) || [];
            const newContactsIds = this.contacts.map((contact) => contact.id);

            for await (const prevContactId of prevContactsIds) {
                if (!newContactsIds.includes(prevContactId)) {
                    await this.vacancy.removeContact(prevContactId);
                }
            }

            const newestPositionsIds = newContactsIds.filter((newPosId) => !prevContactsIds.includes(newPosId));

            resolve(newestPositionsIds);
        });
    }
}

module.exports = Contacts;