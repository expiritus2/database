class Positions {
    constructor(positions, applicant) {
        this.positions = positions;
        this.applicant = applicant;
    }

    create() {
        if (!this.positions || !this.positions.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            for await (const position of this.positions) {
                if (position && position.id) {
                    await this.applicant.addPosition(position.id)
                }
            }
            resolve();
        });
    }

    update() {
        if (!this.positions || !this.positions.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            const newestPositionsIds = await this.#deleteRemovedPositions();

            for await (const newPosId of newestPositionsIds) {
                await this.applicant.addPosition(newPosId);
            }
            resolve();
        });
    }

    #deleteRemovedPositions() {
        return new Promise(async (resolve) => {
            const prevPositionsIds = this.applicant.positions.map((position) => position.id);
            const newPositionsIds = this.positions.map((position) => position.id);

            for await (const prevPosId of prevPositionsIds) {
                if (!newPositionsIds.includes(prevPosId)) {
                    await this.applicant.removePosition(prevPosId);
                }
            }

            const newestPositionsIds = newPositionsIds.filter((newPosId) => !prevPositionsIds.includes(newPosId));

            resolve(newestPositionsIds);
        });
    }
}

module.exports = Positions;