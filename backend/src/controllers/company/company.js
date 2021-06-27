const Company = require('../../models/company');
const DatabaseCreationError = require('../../errors/database-creation-error');

const Users = require('./users');
const Photo = require('./photo');
const Activities = require('./activities');
const Regions = require('./regions');
const Links = require('./links');
const Addresses = require('./addresses');

const { includeModelsFull, includeModelsLight, attributesLight } = require('../../settings/company');

class CompanyController {
    constructor(body) {
        this.body = body;
    }

    create(options = {}) {
        return new Promise(async (resolve) => {
            try {
                const { name, active, info } = this.body;
                const config = { name, active, info };
                this.newCompany = await Company.create(config, options);

                await new Users(this.body.users, this.newCompany).create();
                await new Photo(this.body.photo, this.newCompany).create();
                await new Activities(this.body.activities, this.newCompany).create();
                await new Regions(this.body.regions, this.newCompany).create();
                await new Links(this.body.links, this.newCompany).create();
                await new Addresses(this.body.addresses, this.newCompany).create();

                this.newCompany = await Company.findByPk(this.newCompany.id, { include: includeModelsLight, attributes: attributesLight })

                resolve(this.newCompany);
            } catch (e) {
                throw new DatabaseCreationError();
            }
        });
    }

    update(id) {
        return new Promise(async (resolve) => {
            try {
                const { name, active, info } = this.body;
                const storedCompany = await Company.findByPk(id, { include: includeModelsFull });

                if (storedCompany) {
                    storedCompany.name = name;
                    storedCompany.active = active;
                    storedCompany.info = info;
                    this.updatedCompany = await storedCompany.save();

                    await new Users(this.body.users, this.updatedCompany).update();
                    await new Photo(this.body.photo, this.updatedCompany).update();
                    await new Activities(this.body.activities, this.updatedCompany).update();
                    await new Regions(this.body.regions, this.updatedCompany).update();
                    await new Links(this.body.links, this.updatedCompany).update();
                    await new Addresses(this.body.addresses, this.updatedCompany).update();
                }


                this.updatedCompany = await Company.findByPk(id, { include: includeModelsFull });
                resolve(this.updatedCompany);
            } catch (e) {
                console.error(e);
                throw new DatabaseCreationError();
            }
        });
    }

    delete(id) {
        return new Promise(async (resolve) => {
            await new Users().delete(id);
            await new Photo().delete(id);
            await new Activities().delete(id);
            await new Regions().delete(id);
            await new Links().delete(id);
            await new Addresses().delete(id);

            await Company.destroy({ where: { id }});

            resolve();
        });
    }
}


module.exports = {
    CompanyController,
}