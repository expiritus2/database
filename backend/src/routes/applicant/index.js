const express = require('express');
const { body } = require('express-validator');
const requireAuth = require('../../middlewares/require-auth');
const validateRequest = require('../../middlewares/validate-request');
const Applicant = require('../../models/applicant');
const Position = require('../../models/vocabulary/position');
const Skill = require('../../models/vocabulary/skill');
const Region = require('../../models/vocabulary/region');
const Experience = require('../../models/experience');
const { s3, upload } = require('../../middlewares/file-upload');
const awsS3 = require('../../services/AwsS3');

const { ApplicantController } = require('../../controllers/applicantController');
const Sequelize = require('sequelize');

const router = express.Router();

const Op = Sequelize.Op;

const middlewares = [
    requireAuth,
    [
        body('name').not().isEmpty().withMessage('Name is required'),
        body('positions').isArray().not().isEmpty().withMessage('Positions is required'),
    ],
    validateRequest,
]

router.post('/api/applicants/create', middlewares, async (req, res) => {
    const files = await awsS3.setFiles(req.body.files).upload();
    const photos = await awsS3.setFiles(req.body.photos).upload();

    const applicantController = new ApplicantController(req.body);
    const newApplicant = await applicantController.create();
    const populatedApplicant = await Applicant.findByPk(newApplicant.id, {
        include: [
            { model: Position },
            { model: Skill },
            { model: Region },
            {
                model: Experience, include: [
                    { model: Position }
                ]
            },
        ],
    });

    res.send({ result: populatedApplicant });
});

router.get('/api/applicants', requireAuth, async (req, res) => {
    const { page, countPerPage, search, active } = req.query || {};
    const searchCriteria = {
        where: {
            [Op.and]: [
                ...(search ? [{ name: { [Op.iLike]: `%${search}%` } }] : []),
                ...(active ? [{ inActiveSearch: active }] : []),
            ]
        }
    }

    const allApplicants = await Applicant.findAndCountAll({
        ...searchCriteria,
        limit: countPerPage || 25,
        offset: (page * countPerPage) || 0,
        order: [
            ['updatedAt', 'DESC']
        ],
        include: [
            { model: Position },
            { model: Skill },
            { model: Region },
            {
                model: Experience, include: [
                    { model: Position }
                ]
            },
        ],
    });

    res.send({ result: allApplicants });
});

router.put('/api/applicants/:id', async (req, res) => {
    const savedApplicant = new ApplicantController(req.body);
    const updatedApplicant = await savedApplicant.update(req.params.id);

    res.send({ result: updatedApplicant });
});

router.delete('/api/applicants/:id', async (req, res) => {
    const deletedApplicant = await Applicant.destroy({ where: { id: req.params.id }})

    res.send({ result: deletedApplicant });
});

module.exports = {
    applicantRouter: router,
}