const express = require('express');

const requireAuth = require('../../middlewares/require-auth');
const FakeApplicantController = require('../../controllers/fake/applicant');

const router = express.Router();

router.get('/api/fake/applicants', requireAuth, async (req, res) => {
    await new FakeApplicantController().create();
    res.send({ success: true });
});

router.delete('/api/fake/applicants', requireAuth, async (req, res) => {
    await new FakeApplicantController().delete();
    res.send({ success: true });
});

module.exports = {
    fakeApplicantRouter: router,
}