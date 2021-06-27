const express = require('express');
const { body } = require('express-validator');
const requireAuth = require('../../middlewares/require-auth');
const validateRequest = require('../../middlewares/validate-request');
const Company = require('../../models/company');

const { CompanyController } = require('../../controllers/company/company');
const { includeModelsFull, attributesFull } = require('../../settings/company');
const { getExecOptions } = require('./helpers');

const router = express.Router();

const middlewares = [
    requireAuth,
    // [body('name').not().isEmpty().withMessage('Name is required')],
    validateRequest,
];

router.get('/api/companies', requireAuth, async (req, res) => {
    const options = getExecOptions(req.query);
    const allCompanies = await Company.findAndCountAll(options);

    res.send({ result: allCompanies });
});

router.get('/api/companies/:id', requireAuth, async (req, res) => {
    const populatedCompany = await Company.findByPk(req.params.id, { include: includeModelsFull, attributes: attributesFull});

    res.send({ result: populatedCompany });
})

router.post('/api/companies/create', middlewares, async (req, res) => {
    const newCompany = await new CompanyController(req.body).create();

    res.send({ result: newCompany });
});

router.put('/api/companies/:id', middlewares, async (req, res) => {
    const updatedCompany = await new CompanyController(req.body).update(req.params.id);

    res.send({ result: updatedCompany });
});

router.delete('/api/companies/:id', async (req, res) => {
    await new CompanyController().delete(req.params.id);
    const options = getExecOptions(req.query);
    const allCompanies = await Company.findAndCountAll(options);

    res.send({ result: allCompanies });
});

module.exports = {
    companyRouter: router,
}