const express = require('express');
const { body } = require('express-validator');
const requireAuth = require('../middlewares/require-auth');
const validateRequest = require('../middlewares/validate-request');
const Company = require('../models/company');

const { CompanyController } = require('../controllers/companyController');
const Sequelize = require('sequelize');

const router = express.Router();

const Op = Sequelize.Op;

const middlewares = [
    requireAuth,
    [body('name').not().isEmpty().withMessage('Name is required')],
    validateRequest,
]

router.post('/api/companies/create', middlewares, async (req, res) => {
    const companyController = new CompanyController(req.body);
    const newCompany = await companyController.create();
    const populatedCompany = await Company.findByPk(newCompany.id, {
        include: {
            all: true,
        }
    });

    res.send(populatedCompany);
});

router.get('/api/companies', requireAuth, async (req, res) => {
    const { page, countPerPage, search, active } = req.query || {};
    const searchCriteria = {
        where: {
            [Op.and]: [
                ...(search ? [{ name: { [Op.iLike]: `%${search}%` } }] : []),
                ...(active ? [{ active }] : []),
            ]
        }
    }

    const allCompanies = await Company.findAndCountAll({
        ...searchCriteria,
        limit: countPerPage || 25,
        offset: (page * countPerPage) || 0,
        order: [
            ['updatedAt', 'DESC']
        ],
        include: {
            all: true,
        },
    });

    res.send({ result: allCompanies });
});

router.put('/api/companies/:id', async (req, res) => {
    const savedCompany = new CompanyController(req.body);
    const updatedCompany = await savedCompany.update(req.params.id);

    res.send(updatedCompany);
})

module.exports = {
    companyRouter: router,
}