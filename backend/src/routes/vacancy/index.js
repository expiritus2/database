const express = require('express');
const { body } = require('express-validator');
const requireAuth = require('../../middlewares/require-auth');
const validateRequest = require('../../middlewares/validate-request');
const Vacancy = require('../../models/vacancy');
const Position = require('../../models/position');
const Skill = require('../../models/skill');
const Region = require('../../models/region');
const User = require('../../models/user');
const Company = require('../../models/company');

const { VacancyController } = require('../../controllers/vacancyController');
const Sequelize = require('sequelize');

const router = express.Router();

const Op = Sequelize.Op;

const middlewares = [
    requireAuth,
    // [body('name').not().isEmpty().withMessage('Name is required')],
    validateRequest,
]

router.post('/api/vacancies/create', middlewares, async (req, res) => {
    const vacancyController = new VacancyController(req.body);
    const newVacancy = await vacancyController.create();
    const populatedVacancy = await Vacancy.findByPk(newVacancy.id, {
        include: [
            { model: Skill },
            { model: Position },
            { model: Region },
            { model: Company, attributes: ['id', 'name'] },
            { model: User, attributes: ['id', 'email'], through: { attributes: [] } }
        ],
    });

    res.send(populatedVacancy);
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
        include: [
            { model: Skill },
            { model: Position, attributes: ['id', 'label', 'value'] },
            { model: Region },
            { model: Company, attributes: ['id', 'name'] },
            {
                model: User,
                attributes: ['id', 'email'],
                through: { attributes: [] }
            }
        ],
    });

    res.send({ result: allContacts });
});

router.put('/api/vacancies/:id', async (req, res) => {
    const savedVacancy = new VacancyController(req.body);
    const updatedVacancy = await savedVacancy.update(req.params.id);

    res.send(updatedVacancy);
})

module.exports = {
    vacancyRouter: router,
}