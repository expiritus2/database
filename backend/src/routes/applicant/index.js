const express = require('express');
const { body } = require('express-validator');

const requireAuth = require('../../middlewares/require-auth');
const validateRequest = require('../../middlewares/validate-request');
const Applicant = require('../../models/applicant');

const { ApplicantController } = require('../../controllers/applicant/applicant');
const { includeModelsFull, attributesFull } = require('../../settings/applicant');
const { getExecOptions } = require('./helpers');
const { getPaginatedItems } = require('../../util/handlers');

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
    const { options, isSearch, page, countPerPage } = getExecOptions(req.query);
    const allApplicants = await Applicant.findAndCountAll(options);

    if (isSearch) {
        const { pagedItems } = getPaginatedItems(allApplicants.rows, page, countPerPage);
        return res.send({ result: { count: allApplicants.count, rows: pagedItems } });
    }

    res.send({ result: allApplicants });
});

router.get('/api/applicants/:id', requireAuth, async (req, res) => {
    const populatedApplicant = await Applicant.findByPk(req.params.id, { include: includeModelsFull, attributes: attributesFull});

    res.send({ result: populatedApplicant });
})

router.post('/api/applicants/create', middlewares, async (req, res) => {
    const newApplicant = await new ApplicantController(req.body).create();

    res.send({ result: newApplicant });
});

router.put('/api/applicants/:id', middlewares, async (req, res) => {
    const updatedApplicant = await new ApplicantController(req.body).update(req.params.id);

    res.send({ result: updatedApplicant });
});

router.delete('/api/applicants/:id', async (req, res) => {
    await new ApplicantController().delete(req.params.id);
    const { options } = getExecOptions(req.query);
    const allApplicants = await Applicant.findAndCountAll(options);

    res.send({ result: allApplicants });
});

module.exports = {
    applicantRouter: router,
}