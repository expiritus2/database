const express = require('express');
const { body } = require('express-validator');
const requireAuth = require('../../middlewares/require-auth');
const validateRequest = require('../../middlewares/validate-request');
const Vacancy = require('../../models/vacancy');

const { VacancyController } = require('../../controllers/vacancy/Vacancy');

const { includeModelsFull, attributesFull } = require('../../settings/includeModels/vacancy');
const { getExecOptions } = require('./helpers');
const { getPaginatedItems } = require('../../util/handlers');

const router = express.Router();

const middlewares = [
    requireAuth,
    [
        body('regions').isArray().not().isEmpty().withMessage('Regions is required'),
        body('skills').isArray().not().isEmpty().withMessage('Skills is required'),
        body('position').not().isEmpty().withMessage('Positions is required'),
    ],
    validateRequest,
]

router.get('/api/vacancies', requireAuth, async (req, res) => {
    const { options, isSearch, page, countPerPage } = getExecOptions(req.query);
    const allVacancies = await Vacancy.findAndCountAll(options);

    if (isSearch) {
        const { pagedItems } = getPaginatedItems(allVacancies.rows, page, countPerPage);
        return res.send({ result: { count: allVacancies.count, rows: pagedItems } });
    }

    res.send({ result: allVacancies });
});

router.get('/api/vacancies/:id', requireAuth, async (req, res) => {
    const populatedVacancy = await Vacancy.findByPk(req.params.id, {
        include: includeModelsFull,
        attributes: attributesFull
    });

    res.send({ result: populatedVacancy });
})

router.post('/api/vacancies/create', middlewares, async (req, res) => {
    const newApplicant = await new VacancyController(req.body).create();

    res.send({ result: newApplicant });
});

router.put('/api/vacancies/:id', middlewares, async (req, res) => {
    const updatedVacancy = await new VacancyController(req.body).update(req.params.id);

    res.send({ result: updatedVacancy });
});

router.delete('/api/vacancies/:id', async (req, res) => {
    await new VacancyController().delete(req.params.id);
    const { options } = getExecOptions(req.query);
    const allVacancies = await Vacancy.findAndCountAll(options);

    res.send({ result: allVacancies });
});

module.exports = {
    vacancyRouter: router,
}