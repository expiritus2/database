const express = require('express');

const requireAuth = require('../../middlewares/require-auth');
const FakeVacancyController = require('../../controllers/fake/vacancy');

const router = express.Router();

router.get('/api/fake/vacancies', requireAuth, async (req, res) => {
    await new FakeVacancyController().create();
    res.send({ success: true });
});

router.delete('/api/fake/vacancies', requireAuth, async (req, res) => {
    await new FakeVacancyController().delete();
    res.send({ success: true });
});

module.exports = {
    fakeVacancyRouter: router,
}