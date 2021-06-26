const ThroughVacancyRegion = require('../../models/through/vacancyRegion');

class Regions {
    constructor(regions, vacancy) {
        this.regions = regions;
        this.vacancy = vacancy;
    }

    create() {
        if (!this.regions || !this.regions.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            for await (const region of this.regions) {
                if (region && region.id) {
                    await this.vacancy.addRegion(region.id);
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
                await this.vacancy.addRegion(regionId);
            }
            resolve();
        });
    }

    delete(vacancyId) {
        return new Promise(async (resolve) => {
            await ThroughVacancyRegion.destroy({ where: { vacancyId }});
            resolve();
        });
    }

    #deleteRemovedRegions(vacancyId) {
        return new Promise(async (resolve) => {
            const prevRegionsIds = this.vacancy.regions.map((region) => region.id);
            const newRegionsIds = this.regions.map((region) => region.id);

            for await (const prevRegionId of prevRegionsIds) {
                if (!newRegionsIds.includes(prevRegionId)) {
                    await this.vacancy.removeRegion(prevRegionId);
                }
            }

            const newestRegionsIds = newRegionsIds.filter((newRegionId) => !prevRegionsIds.includes(newRegionId));

            resolve(newestRegionsIds);
        });
    }
}

module.exports = Regions;