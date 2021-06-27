const ThroughCompanyActivity = require('../../models/through/companyActivity');

class Activities {
    constructor(activities, company) {
        this.activities = activities;
        this.company = company;
    }

    create() {
        if (!this.activities || !this.activities.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            for await (const activity of this.activities) {
                if (activity && activity.id) {
                    await this.company.addActivity(activity.id);
                }
            }
            resolve();
        });
    }

    update() {
        if (!this.activities) return Promise.resolve();

        return new Promise(async (resolve) => {
            const newestActivitiesIds = await this.#deleteRemovedActivities();

            for await (const activityId of newestActivitiesIds) {
                await this.company.addActivity(activityId);
            }
            resolve();
        });
    }

    delete(companyId) {
        return new Promise(async (resolve) => {
            await ThroughCompanyActivity.destroy({ where: { companyId }});
            resolve();
        });
    }

    #deleteRemovedActivities() {
        return new Promise(async (resolve) => {
            const prevActivitiesIds = this.company.activities.map((activity) => activity.id);
            const newActivitiesIds = this.activities.map((activity) => activity.id);

            for await (const prevActivityId of prevActivitiesIds) {
                if (!newActivitiesIds.includes(prevActivityId)) {
                    await this.company.removeActivity(prevActivityId);
                }
            }

            const newestActivitiesIds = newActivitiesIds.filter((newActivityId) => !prevActivitiesIds.includes(newActivityId));

            resolve(newestActivitiesIds);
        });
    }
}

module.exports = Activities;