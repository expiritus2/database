const Contact = require('../../models/contact');

const Company = require('./Company');
const Positions = require('./Positions');
const Photos = require('./Photos');
const Phones = require('./Phones');
const Emails = require('./Emails');
const Sex = require('./Sex');

const { includeModelsFull, includeModelsLight, attributesLight } = require('../../settings/includeModels/contact');

class ContactController {
    constructor(body) {
        this.body = body;
    }

    create(options = {}) {
        return new Promise(async (resolve) => {
            try {
                const { name, active, birthDate } = this.body;
                const config = { name, active, birthDate };
                this.newContact = await Contact.create(config, options);

                await new Company(this.body.company, this.newContact).create();
                await new Positions(this.body.positions, this.newContact).create();
                await new Photos(this.body.photos, this.newContact).create();
                await new Phones(this.body.phones, this.newContact).create();
                await new Emails(this.body.emails, this.newContact).create();
                await new Sex(this.body.sex, this.newContact).create();

                this.newContact = await Contact.findByPk(this.newContact.id, { include: includeModelsLight, attributes: attributesLight });

                resolve(this.newContact);
            } catch (err) {
                throw err;
            }
        });
    }

    update(id) {
        return new Promise(async (resolve) => {
            try {
                const { name, active, birthDate } = this.body;
                const storedContact = await Contact.findByPk(id, { include: includeModelsFull });

                if (storedContact) {
                    storedContact.name = name;
                    storedContact.active = active;
                    storedContact.birthDate = birthDate;
                    this.updatedContact = await storedContact.save();

                    await new Company(this.body.company, this.updatedContact).update();
                    await new Positions(this.body.positions, this.updatedContact).update();
                    await new Photos(this.body.photos, this.updatedContact).update();
                    await new Phones(this.body.phones, this.updatedContact).update();
                    await new Emails(this.body.emails, this.updatedContact).update();
                    await new Sex(this.body.sex, this.updatedContact).update();
                }


                this.updatedContact = await Contact.findByPk(id, { include: includeModelsFull });
                resolve(this.updatedContact);
            } catch (err) {
                throw err;
            }
        });
    }

    delete(id) {
        return new Promise(async (resolve) => {
            await new Positions().delete(id);
            await new Photos().delete(id);
            await new Phones().delete(id);
            await new Emails().delete(id);

            await Contact.destroy({ where: { id }});

            resolve();
        });
    }
}


module.exports = {
    ContactController,
}