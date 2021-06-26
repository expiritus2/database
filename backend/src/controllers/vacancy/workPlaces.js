const ThroughVacancyWorkPlaces = require('../../models/through/vacancyWorkPlace');

class WorkPlaces {
    constructor(workPlaces, vacancy) {
        this.workPlaces = workPlaces;
        this.vacancy = vacancy;
    }

    create() {
        if (!this.workPlaces || !this.workPlaces.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            for await (const workPlace of this.workPlaces) {
                if (workPlace && workPlace.id) {
                    await this.vacancy.addWorkPlace(workPlace.id);
                }
            }
            resolve();
        });
    }

    update() {
        if (!this.workPlaces) return Promise.resolve();

        return new Promise(async (resolve) => {
            const newestWorkPlacesIds = await this.#deleteRemovedWorkPlaces(this.vacancy.id);

            for await (const newWorkPlaceId of newestWorkPlacesIds) {
                await this.vacancy.addWorkPlace(newWorkPlaceId);
            }
            resolve();
        });
    }

    delete(vacancyId) {
        return new Promise(async (resolve) => {
            await ThroughVacancyWorkPlaces.destroy({ where: { vacancyId }});
            resolve();
        });
    }

    #deleteRemovedWorkPlaces() {

        return new Promise(async (resolve) => {
            const prevWorkPlacesIds = this.vacancy.workPlaces.map((workPlace) => workPlace.id);
            const newWorkPlacesIds = this.workPlaces.map((workPlace) => workPlace.id);

            for await (const prevWorkPlaceId of prevWorkPlacesIds) {
                if (!newWorkPlacesIds.includes(prevWorkPlaceId)) {
                    await this.vacancy.removeWorkPlace(prevWorkPlaceId);
                }
            }

            const newestWorkPlacesIds = newWorkPlacesIds.filter((newWorkPlaceId) => !prevWorkPlacesIds.includes(newWorkPlaceId));

            resolve(newestWorkPlacesIds);
        });
    }
}

module.exports = WorkPlaces;