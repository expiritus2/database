const express = require('express');
const { body } = require('express-validator');
const requireAuth = require('../../middlewares/require-auth');
const validateRequest = require('../../middlewares/validate-request');
const Vacancy = require('../../models/vacancy');

const { VacancyController } = require('../../controllers/vacancy/vacancy');

const { includeModels, attributes } = require('../../settings/vacancy');
const { getExecOptions } = require('./helpers');

const router = express.Router();

const middlewares = [
    requireAuth,
    // [body('name').not().isEmpty().withMessage('Name is required')],
    validateRequest,
]

router.get('/api/vacancies', requireAuth, async (req, res) => {
    const options = getExecOptions(req.query);
    const allApplicants = await Vacancy.findAndCountAll(options);

    res.send({ result: allApplicants });
});

router.post('/api/vacancies/create', middlewares, async (req, res) => {
    const vacancyController = new VacancyController(req.body);
    const newVacancy = await vacancyController.create();
    const populatedVacancy = await Vacancy.findByPk(newVacancy.id, { include: includeModels, attributes });

    res.send(populatedVacancy);
});

router.put('/api/vacancies/:id', async (req, res) => {
    const savedVacancy = new VacancyController(req.body);
    const updatedVacancy = await savedVacancy.update(req.params.id);
    const populatedVacancy = await Vacancy.findByPk(updatedVacancy.id, { include: includeModels, attributes });

    res.send({ result: populatedVacancy });
});

router.delete('/api/vacancies/:id', async (req, res) => {
    await new VacancyController().delete(req.params.id);
    const options = getExecOptions(req.query);
    const allApplicants = await Vacancy.findAndCountAll(options);

    res.send({ result: allApplicants });
});

module.exports = {
    vacancyRouter: router,
}