class Position {
    constructor(position, vacancy) {
        this.position = position;
        this.vacancy = vacancy;
    }

    create() {
        if (!this.position) return Promise.resolve();

        return new Promise(async (resolve) => {
            if (this.position.id) {
                await this.vacancy.setPosition(this.position.id)
            }
            resolve();
        });
    }

    update() {
        if (!this.position) return Promise.resolve();

        return new Promise(async (resolve) => {
            if (this.position.id) {
                await this.vacancy.setPosition(this.position.id)
            }
            resolve();
        });
    }
}

module.exports = Position;