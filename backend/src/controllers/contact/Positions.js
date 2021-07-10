const ThroughContactPosition = require('../../models/through/contactPosition');

class Positions {
    constructor(positions, contact) {
        this.positions = positions;
        this.contact = contact;
    }

    create() {
        if (!this.positions || !this.positions.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            for await (const position of this.positions) {
                if (position && position.id) {
                    await this.contact.addPosition(position.id)
                }
            }
            resolve();
        });
    }

    update() {
        if (!this.positions) return Promise.resolve();

        return new Promise(async (resolve) => {
            const newestPositionsIds = await this.#deleteRemovedPositions();

            for await (const newPosId of newestPositionsIds) {
                await this.contact.addPosition(newPosId);
            }
            resolve();
        });
    }

    delete(contactId) {
        return new Promise(async (resolve) => {
            await ThroughContactPosition.destroy({ where: { contactId }});
            resolve();
        });
    }

    #deleteRemovedPositions() {
        return new Promise(async (resolve) => {
            const prevPositionsIds = this.contact.positions.map((position) => position.id);
            const newPositionsIds = this.positions.map((position) => position.id);

            for await (const prevPosId of prevPositionsIds) {
                if (!newPositionsIds.includes(prevPosId)) {
                    await this.contact.removePosition(prevPosId);
                }
            }

            const newestPositionsIds = newPositionsIds.filter((newPosId) => !prevPositionsIds.includes(newPosId));

            resolve(newestPositionsIds);
        });
    }
}

module.exports = Positions;