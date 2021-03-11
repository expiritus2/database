const express = require('express');
const requireAuth = require('../middlewares/require-auth');
const Applicant = require('../models/applicant');
const { omit } = require('lodash');

const router = express.Router();

router.post('/api/applicants/create', requireAuth, async (req, res) => {
    const { profile, files } = req.body;
    const info = omit(req.body.info, 'phones');

    const joinedInfo = { ...profile, ...info, files };
    const newApplicant = await Applicant.create(joinedInfo);

    console.log('newApplicant', newApplicant);

    res.send({ data: 'OK' });
});

module.exports = {
    applicantRouter: router,
}