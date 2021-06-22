const Messenger = require('../../models/messenger');

class Messengers {
    constructor(messengers, applicant) {
        this.messengers = messengers;
        this.applicant = applicant;
    }

    create() {
        if (!this.messengers || !this.messengers.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            for await (const messenger of this.messengers) {
                await this.#createMessenger(messenger, this.applicant);
            }
            resolve();
        });
    }

    update() {
        if (!this.messengers || !this.messengers.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            const newestMessengers = await this.#deleteRemovedMessengers();
            for await (const messenger of newestMessengers) {
                await this.#createMessenger(messenger);
            }

            const notChangedMessengers = this.messengers.filter((messenger) => !!messenger.id);
            for await (const messenger of notChangedMessengers) {
                await Messenger.update({
                    accountName: messenger && messenger.accountName ? messenger.accountName : '',
                    messengerTypeId: messenger && messenger.messengerType && messenger.messengerType.id ? messenger.messengerType.id : null,
                }, { where: { id: messenger.id } })
            }
            resolve();
        });
    }

    delete(applicantId) {
        return new Promise(async (resolve) => {
            await Messenger.destroy({ where: { applicantId }});
            resolve();
        });
    }

    #deleteRemovedMessengers() {
        return new Promise(async (resolve) => {
            const prevStoredMessengers = this.applicant.messengers || []
            const newMessengersIds = this.messengers.filter((messenger) => !!messenger.id).map((d) => d.id);

            for await (const prevStoredMessenger of prevStoredMessengers) {
                if (!newMessengersIds.includes(prevStoredMessenger.id)) {
                    await Messenger.destroy({ where: { id: prevStoredMessenger.id } });
                }
            }

            const newestMessengers = this.messengers.filter((messenger) => !messenger.id);

            resolve(newestMessengers);
        });
    }

    #createMessenger(messenger) {
        return new Promise(async (resolve) => {
            if (messenger && messenger.accountName) {
                const newMessenger = await Messenger.create({ accountName: messenger.accountName });

                if (messenger && messenger.messengerType && messenger.messengerType.id) {
                    newMessenger.setMessengerType(messenger.messengerType.id);
                }
                newMessenger.setApplicant(this.applicant);
            }

            resolve();
        });
    }
}

module.exports = Messengers;