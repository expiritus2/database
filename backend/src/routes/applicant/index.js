const express = require('express');
const { body } = require('express-validator');

const requireAuth = require('../../middlewares/require-auth');
const validateRequest = require('../../middlewares/validate-request');
const Applicant = require('../../models/applicant');

const { ApplicantController } = require('../../controllers/applicant/applicant');
const { includeModels, attributes } = require('../../settings/applicant');
const { getExecOptions } = require('./helpers');

const router = express.Router();

const middlewares = [
    requireAuth,
    [
        body('regions').isArray().not().isEmpty().withMessage('Regions is required'),
        body('skills').isArray().not().isEmpty().withMessage('Skills is required'),
        body('positions').isArray().not().isEmpty().withMessage('Positions is required'),
        body('name').not().isEmpty().withMessage('Name is required'),
    ],
    validateRequest,
]

router.get('/api/applicants', requireAuth, async (req, res) => {
    const options = getExecOptions(req.query);
    const allApplicants = await Applicant.findAndCountAll(options);

    res.send({ result: allApplicants });
});

router.post('/api/applicants/create', middlewares, async (req, res) => {
    const applicantController = new ApplicantController(req.body);
    const newApplicant = await applicantController.create();
    const populatedApplicant = await Applicant.findByPk(newApplicant.id, { include: includeModels, attributes });

    res.send({ result: populatedApplicant });
});

router.put('/api/applicants/:id', middlewares, async (req, res) => {
    const savedApplicant = new ApplicantController(req.body);
    const updatedApplicant = await savedApplicant.update(req.params.id);
    const populatedApplicant = await Applicant.findByPk(updatedApplicant.id, { include: includeModels, attributes });

    res.send({ result: populatedApplicant });
});

router.delete('/api/applicants/:id', async (req, res) => {
    await new ApplicantController().delete(req.params.id);
    const options = getExecOptions(req.query);
    const allApplicants = await Applicant.findAndCountAll(options);

    res.send({ result: allApplicants });
});

module.exports = {
    applicantRouter: router,
}