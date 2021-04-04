const express = require('express');
const { body } = require('express-validator');
const requireAuth = require('../middlewares/require-auth');
const validateRequest = require('../middlewares/validate-request');
const Applicant = require('../models/applicant');

const { ApplicantController } = require('../controllers/applicantController');
const Sequelize = require('sequelize');

const router = express.Router();

const Op = Sequelize.Op;

const middlewares = [
    requireAuth,
    [body('name').not().isEmpty().withMessage('Name is required')],
    validateRequest,
]

router.post('/api/applicants/create', middlewares, async (req, res) => {
    const applicantController = new ApplicantController(req.body);
    const newApplicant = await applicantController.create();
    const populatedApplicant = await Applicant.findByPk(newApplicant.id, { include: { all: true, nested: true } });

    res.send(populatedApplicant);
});

router.get('/api/applicants', requireAuth, async (req, res) => {
    const { page, countPerPage, search, active } = req.query || {};
    let searchCriteria = {};

    if (search && active !== undefined) {
        searchCriteria = {
            where: {
                [Op.and]: [
                    {
                        name: {
                            [Op.iLike]: `%${search}%`,
                        }
                    },
                    {
                        inActiveSearch: active
                    },
                ]
            }
        }
    }

    if (search && active === undefined) {
        searchCriteria = {
            where: {
                name: {
                    [Op.iLike]: `%${search}%`,
                }
            },
        }
    }

    if (!search && active) {
        searchCriteria = {
            where: { inActiveSearch: active },
        }
    }

    const allApplicants = await Applicant.findAndCountAll({
        ...searchCriteria,
        limit: countPerPage || 25,
        offset: (page * countPerPage) || 0,
        order: [
            ['updatedAt', 'DESC']
        ],
        include: { all: true, nested: true },
    });

    res.send({ result: allApplicants });
});

router.put('/api/applicants/:id', async (req, res) => {
    const savedApplicant = new ApplicantController(req.body);
    const updatedApplicant = await savedApplicant.update(req.params.id);

    res.send(updatedApplicant);
})

module.exports = {
    applicantRouter: router,
}