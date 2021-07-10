const ThroughCompanyRegion = require('../../models/through/companyRegion');

class Regions {
    constructor(regions, company) {
        this.regions = regions;
        this.company = company;
    }

    create() {
        if (!this.regions || !this.regions.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            for await (const region of this.regions) {
                if (region && region.id) {
                    await this.company.addRegion(region.id);
                }
            }
            resolve();
        });
    }

    update() {
        if (!this.regions) return Promise.resolve();

        return new Promise(async (resolve) => {
            const newestRegionsIds = await this.#deleteRemovedRegions();

            for await (const regionId of newestRegionsIds) {
                await this.company.addRegion(regionId);
            }
            resolve();
        });
    }

    delete(companyId) {
        return new Promise(async (resolve) => {
            await ThroughCompanyRegion.destroy({ where: { companyId }});
            resolve();
        });
    }

    #deleteRemovedRegions(companyId) {
        return new Promise(async (resolve) => {
            const prevRegionsIds = this.company.regions.map((region) => region.id);
            const newRegionsIds = this.regions.map((region) => region.id);

            for await (const prevRegionId of prevRegionsIds) {
                if (!newRegionsIds.includes(prevRegionId)) {
                    await this.company.removeRegion(prevRegionId);
                }
            }

            const newestRegionsIds = newRegionsIds.filter((newRegionId) => !prevRegionsIds.includes(newRegionId));

            resolve(newestRegionsIds);
        });
    }
}

module.exports = Regions;