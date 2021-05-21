const Contact = require('../models/contact');
const Position = require('../models/vocabulary/position');
const DatabaseCreationError = require('../errors/database-creation-error');
const { omit } = require('lodash');

class ContactController {
    constructor(body) {
        this.body = body;
        this.positions = this.body.positions;

        this.joinedInfo = omit(this.body, ['positions']);
    }

    create(options = {}) {
        return new Promise(async (resolve) => {
            try {
                this.newContact = await Contact.create(this.joinedInfo, options);
                await this.handlePositions(this.positions, this.newContact);

                resolve(this.newContact);
            } catch (e) {
                throw new DatabaseCreationError();
            }
        });
    }

    update(id) {
        return new Promise(async (resolve) => {
            try {
                await Contact.update(this.joinedInfo, { where: { id }});
                this.newContact = await Contact.findByPk(id, { include: { all: true }});

                if (this.newContact) {
                    await this.handlePositions(this.positions, this.newContact, true);
                }

                resolve(this.newContact);
            } catch (e) {
                console.error(e);
                throw new DatabaseCreationError();
            }
        });
    }

    handlePositions(positions, parentModel, isUpdate) {
        return new Promise(async (resolve) => {
            if (positions && !positions.length) {
                await this._deleteRemovedPositions(positions, parentModel);
            }

            for await (const pos of positions) {
                await this._findOrCreatePosition(pos);

                if (isUpdate) {
                    await this._deleteRemovedPositions(positions, parentModel);
                    await parentModel.addPosition(this.savedPosition);
                } else {
                    await parentModel.addPosition(this.savedPosition);
                }
            }
            resolve(this.savedPosition);
        });
    }

    async _findOrCreatePosition(position) {
        this.savedPosition = await Position.findOne({ where: { value: position.value } });
        if (!this.savedPosition) {
            this.savedPosition = await Position.create(position);
        }
    }

    async _deleteRemovedPositions(positions, parentModel) {
        for await (const prevPos of parentModel.positions || []) {
            const newPositionsIds = positions.map((position) => position.id);
            if (!newPositionsIds.includes(prevPos.id)) {
                await parentModel.removePosition(prevPos);
            }
        }
    }
}


module.exports = {
    ContactController,
}