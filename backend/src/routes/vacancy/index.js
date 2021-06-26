const express = require('express');
const { body } = require('express-validator');
const requireAuth = require('../../middlewares/require-auth');
const validateRequest = require('../../middlewares/validate-request');
const Vacancy = require('../../models/vacancy');

const { VacancyController } = require('../../controllers/vacancy/vacancy');

const { includeModelsFull, attributesFull, includeModelsLight, attributesLight } = require('../../settings/vacancy');
const { getExecOptions } = require('./helpers');

const router = express.Router();

const middlewares = [
    requireAuth,
    // [body('name').not().isEmpty().withMessage('Name is required')],
    validateRequest,
]

router.get('/api/vacancies', requireAuth, async (req, res) => {
    const options = getExecOptions(req.query);
    const allVacancies = await Vacancy.findAndCountAll(options);

    res.send({ result: allVacancies });
});

router.get('/api/vacancies/:id', requireAuth, async (req, res) => {
    const populatedVacancy = await Vacancy.findByPk(req.params.id, { include: includeModelsFull, attributes: attributesFull});

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
    const options = getExecOptions(req.query);
    const allVacancies = await Vacancy.findAndCountAll(options);

    res.send({ result: allVacancies });
});

module.exports = {
    vacancyRouter: router,
}