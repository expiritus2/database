const express = require('express');
const requireAuth = require('../middlewares/require-auth');
const Applicant = require('../models/applicant');
const Position = require('../models/position');
const Skills = require('../models/skill');
const Region = require('../models/region');

const { ApplicantController } = require('../controllers/applicantController');

const router = express.Router();

router.post('/api/applicants/create', requireAuth, async (req, res) => {
    const newApplicant = await new ApplicantController(req.body).create();

    res.send(newApplicant);
});

router.get('/api/applicants', requireAuth, async (req, res) => {
    const allApplicants = await Applicant.findAndCountAll({
        limit: 25,
        offset: 0,
        include: [
            { model: Position, attributes: ['id', 'label', 'value'] },
            { model: Skills, attributes: ['id', 'label', 'value'] },
            { model: Region, attributes: ['id', 'label', 'value'] },
        ],
    });

    res.send({ result: allApplicants });
})

module.exports = {
    applicantRouter: router,
}