const express = require('express');
const { body } = require('express-validator');
const requireAuth = require('../middlewares/require-auth');
const validateRequest = require('../middlewares/validate-request');
const Applicant = require('../models/applicant');
const Position = require('../models/position');
const Skill = require('../models/skill');
const Region = require('../models/region');
const Experience = require('../models/experience');

const { ApplicantController } = require('../controllers/applicantController');

const router = express.Router();

const middlewares = [
    requireAuth,
    [body('name').not().isEmpty().withMessage('Name is required')],
    validateRequest,
]

router.post('/api/applicants/create', middlewares, async (req, res) => {
    const newApplicant = await new ApplicantController(req.body).create();

    res.send(newApplicant);
});

router.get('/api/applicants', requireAuth, async (req, res) => {
    const allApplicants = await Applicant.findAndCountAll({
        limit: 25,
        offset: 0,
        include: [
            { model: Position, attributes: ['id', 'label', 'value'] },
            { model: Skill, attributes: ['id', 'label', 'value'] },
            { model: Region, attributes: ['id', 'label', 'value'] },
            {
                model: Experience,
                include: [
                    { model: Position }
                ]
            },
        ],
    });

    res.send({ result: allApplicants });
});

router.put('/api/applicants/:id/update', async (req, res) => {
    res.send({ success: true });
})

module.exports = {
    applicantRouter: router,
}