const express = require('express');
const faker = require('faker');

const { ApplicantController } = require('../controllers/applicant/applicant');

const router = express.Router();

router.post('/api/fake/generate-data', async (req, res) => {
    const fakeDatas = generateFakeData();

    for await (let data of fakeDatas) {
        const applicantController = new ApplicantController(data);
        const newApplicant = await applicantController.create();
    }

    console.info('Creation finished')
    res.send({ success: true });
});

function generateFakeData() {
    const fakeDatas = []
    for (let i = 0; i < 500; i++) {
        const name = `${faker.name.firstName()} ${faker.name.lastName()}`;

        fakeDatas.push({
            name,
            regions: [],
            positions: [],
            skills: [],
            experiences: [],
        });
    }

    return fakeDatas;
}

module.exports = {
    fakeRouter: router
};