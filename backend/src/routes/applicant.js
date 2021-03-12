const express = require('express');
const requireAuth = require('../middlewares/require-auth');
const Applicant = require('../models/applicant');
const Phone = require('../models/phone');
const { omit } = require('lodash');

const router = express.Router();

router.post('/api/applicants/create', requireAuth, async (req, res) => {
    const { profile, files, experience, info } = req.body;
    const flatInfo = omit(info, 'phones');

    const joinedInfo = { ...profile, ...flatInfo, files };
    const newApplicant = await Applicant.create(joinedInfo);

    for (const phone of info.phones) {
        const newPhone = await Phone.create(phone);
        newPhone.setApplicant(newApplicant);
    }

    console.log('joinedInfo', joinedInfo);
    console.log('phones', info?.phones);
    console.log('experience', experience);

    res.send({ data: 'OK' });
});

module.exports = {
    applicantRouter: router,
}