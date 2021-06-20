class Regions {
    constructor(regions, applicant) {
        this.regions = regions;
        this.applicant = applicant;
    }

    create() {
        if (!this.regions || !this.regions.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            for await (const region of this.regions) {
                if (region && region.id) {
                    await this.applicant.addRegion(region.id);
                }
            }
            resolve();
        });
    }

    update() {
        if (!this.regions || !this.regions.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            const newestRegionsIds = await this.#deleteRemovedRegions();

            for await (const regionId of newestRegionsIds) {
                await this.applicant.addRegion(regionId);
            }
            resolve();
        });
    }

    #deleteRemovedRegions(applicantId) {
        return new Promise(async (resolve) => {
            const prevRegionsIds = this.applicant.regions.map((region) => region.id);
            const newRegionsIds = this.regions.map((region) => region.id);

            for await (const prevRegionId of prevRegionsIds) {
                if (!newRegionsIds.includes(prevRegionId)) {
                    await this.applicant.removeRegion(prevRegionId);
                }
            }

            const newestRegionsIds = newRegionsIds.filter((newRegionId) => !prevRegionsIds.includes(newRegionId));

            resolve(newestRegionsIds);
        });
    }
}

module.exports = Regions;