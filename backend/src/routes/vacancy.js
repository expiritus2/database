const express = require('express');
const { body } = require('express-validator');
const requireAuth = require('../middlewares/require-auth');
const validateRequest = require('../middlewares/validate-request');
const Vacancy = require('../models/vacancy');

const { VacancyController } = require('../controllers/vacancyController');
const Sequelize = require('sequelize');

const router = express.Router();

const Op = Sequelize.Op;

const middlewares = [
    requireAuth,
    [body('name').not().isEmpty().withMessage('Name is required')],
    validateRequest,
]

router.post('/api/vacancies/create', middlewares, async (req, res) => {
    const contactController = new VacancyController(req.body);
    const newContact = await contactController.create();
    const populatedContact = await Vacancy.findByPk(newContact.id, { include: { all: true, nested: true } });

    res.send(populatedContact);
});

router.get('/api/vacancies', requireAuth, async (req, res) => {
    const { page, countPerPage, search, active } = req.query || {};
    const searchCriteria = {
        where: {
            [Op.and]: [
                ...(search ? [{ name: { [Op.iLike]: `%${search}%` } }] : []),
                ...(active ? [{ active }] : []),
            ]
        }
    }

    const allContacts = await Vacancy.findAndCountAll({
        ...searchCriteria,
        limit: countPerPage || 25,
        offset: (page * countPerPage) || 0,
        order: [
            ['updatedAt', 'DESC']
        ],
        include: { all: true, nested: true },
    });

    res.send({ result: allContacts });
});

router.put('/api/vacancies/:id', async (req, res) => {
    const savedContact = new VacancyController(req.body);
    const updatedContact = await savedContact.update(req.params.id);

    res.send(updatedContact);
})

module.exports = {
    vacancyRouter: router,
}