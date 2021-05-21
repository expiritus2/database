const Company = require('../models/company');
const User = require('../models/user');
const Region = require('../models/vocabulary/region');
const DatabaseCreationError = require('../errors/database-creation-error');
const { omit } = require('lodash');

class CompanyController {
    constructor(body) {
        this.body = body;
        this.regions = this.body.regions;
        this.users = this.body.users;

        this.joinedInfo = omit(this.body, ['regions']);
    }

    create(options = {}) {
        return new Promise(async (resolve) => {
            try {
                this.newCompany = await Company.create(this.joinedInfo, options);
                await this.handleRegions();
                await this.handleUsers();

                resolve(this.newCompany);
            } catch (e) {
                throw new DatabaseCreationError();
            }
        });
    }

    update(id) {
        return new Promise(async (resolve) => {
            try {
                await Company.update(this.joinedInfo, { where: { id }});
                this.newCompany = await Company.findByPk(id, { include: { all: true }});

                if (this.newCompany) {
                    await this.handleRegions(true);
                    await this.handleUsers(true);
                }

                resolve(this.newCompany);
            } catch (e) {
                console.error(e);
                throw new DatabaseCreationError();
            }
        });
    }

    async handleRegions(isUpdate) {
        return new Promise(async (resolve) => {
            for await (const region of this.regions) {
                await this._findOrCreateRegion(region);

                if (isUpdate) {
                    await this._deleteRemovedCompanyRegion();
                    await this.newCompany.addRegion(this.savedRegion);
                } else {
                    await this.newCompany.addRegion(this.savedRegion);
                }
            }
            resolve(this.savedRegion);
        });
    }

    handleUsers(isUpdate) {
        return new Promise(async (resolve) => {
            for await (const recruiterId of this.users) {
                this.savedRecruiter = await User.findByPk(recruiterId);

                if (isUpdate) {
                    await this._deleteRemovedUser();
                    await this.newCompany.addUser(this.savedRecruiter);
                } else {
                    await this.newCompany.addUser(this.savedRecruiter);
                }
            }
            resolve();
        });
    }

    async _deleteRemovedUser() {
        if (!this.users.includes(this.savedRecruiter.id)) {
            await this.newCompany.removeUser(this.savedRecruiter);
        }
    }

    async _findOrCreateRegion(region) {
        this.savedRegion = await Region.findOne({ where: { value: region.value } });

        if (!this.savedRegion) {
            this.savedRegion = await Region.create(region);
        }
    }

    async _deleteRemovedCompanyRegion() {
        const newRegionsIds = this.regions.map((region) => region.id);
        for await (const prevRegion of this.newCompany.regions) {
            if (!newRegionsIds.includes(prevRegion.id)) {
                await this.newCompany.removeRegion(prevRegion);
            }
        }
    }
}


module.exports = {
    CompanyController,
}