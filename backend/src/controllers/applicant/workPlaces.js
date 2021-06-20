class WorkPlaces {
    constructor(workPlaces, applicant) {
        this.workPlaces = workPlaces;
        this.applicant = applicant;
    }

    create() {
        if (!this.workPlaces || !this.workPlaces.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            for await (const workPlace of this.workPlaces) {
                if (workPlace && workPlace.id) {
                    await this.applicant.addWorkPlace(workPlace.id);
                }
            }
            resolve();
        });
    }

    update() {
        if (!this.workPlaces || !this.workPlaces.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            const newestWorkPlacesIds = await this.#deleteRemovedWorkPlaces(this.applicant.id);

            for await (const newWorkPlaceId of newestWorkPlacesIds) {
                await this.applicant.addWorkPlace(newWorkPlaceId);
            }
            resolve();
        });
    }

    #deleteRemovedWorkPlaces(applicantId) {
        return new Promise(async (resolve) => {
            const prevWorkPlacesIds = this.applicant.workPlaces.map((workPlace) => workPlace.id);
            const newWorkPlacesIds = this.workPlaces.map((workPlace) => workPlace.id);

            for await (const prevWorkPlaceId of prevWorkPlacesIds) {
                if (!newWorkPlacesIds.includes(prevWorkPlaceId)) {
                    await this.applicant.removeWorkPlace(prevWorkPlaceId);
                }
            }

            const newestWorkPlacesIds = newWorkPlacesIds.filter((newWorkPlaceId) => !prevWorkPlacesIds.includes(newWorkPlaceId));

            resolve(newestWorkPlacesIds);
        });
    }
}

module.exports = WorkPlaces;