const express = require('express');
const requireAuth = require('../middlewares/require-auth');

const { ApplicantController } = require('../controllers/applicantController');

const router = express.Router();

router.post('/api/applicants/create', requireAuth, async (req, res) => {
    const newApplicant = await new ApplicantController(req.body).create();

    res.send(newApplicant);
});

module.exports = {
    applicantRouter: router,
}