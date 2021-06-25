class TestFile {
    constructor(testFile, vacancy) {
        this.testFile = testFile;
        this.vacancy = vacancy;
    }

    create() {
        if (!this.testFile || !this.testFile.length) return Promise.resolve();

        return new Promise(async (resolve) => {

            resolve();
        });
    }

    update() {
        if (!this.testFile || !this.testFile.length) return Promise.resolve();

        return new Promise(async (resolve) => {
            
            resolve();
        });
    }
}

module.exports = TestFile;