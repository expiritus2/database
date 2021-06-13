const express = require('express');
const { body } = require('express-validator');

const requireAuth = require('../../middlewares/require-auth');
const validateRequest = require('../../middlewares/validate-request');
const Applicant = require('../../models/applicant');

const VocabularyPosition = require('../../models/vocabulary/position');
const VocabularySkill = require('../../models/vocabulary/skill');
const VocabularyRegion = require('../../models/vocabulary/region');
const VocabularyEducation = require('../../models/vocabulary/education');
const VocabularySex = require('../../models/vocabulary/sex');
const VocabularyMessengerType = require('../../models/vocabulary/messengerType');
const VocabularyCurrency = require('../../models/vocabulary/currency');
const VocabularyWorkPlace = require('../../models/vocabulary/workPlace');
const VocabularyLanguage = require('../../models/vocabulary/language');
const VocabularyLanguageLevel = require('../../models/vocabulary/languageLevel');

const File = require('../../models/file');
const Photo = require('../../models/photo');
const Phone = require('../../models/phone');
const Email = require('../../models/email');
const Experience = require('../../models/experience');
const Messenger = require('../../models/messenger');
const Salary = require('../../models/salary');
const LanguageSkill = require('../../models/languageSkill');

const { ApplicantController } = require('../../controllers/applicantController');
const Sequelize = require('sequelize');

const router = express.Router();

const Op = Sequelize.Op;

const middlewares = [
    requireAuth,
    [
        // body('name').not().isEmpty().withMessage('Name is required'),
        // body('positions').isArray().not().isEmpty().withMessage('Positions is required'),
    ],
    validateRequest,
]

const includeModels = [
    { model: VocabularyPosition },
    { model: VocabularySkill },
    { model: VocabularyRegion },
    { model: VocabularyEducation },
    { model: VocabularySex },
    { model: VocabularyWorkPlace },
    { model: Photo },
    { model: Phone },
    { model: File },
    { model: Email },
    { model: Salary, include: [{ model: VocabularyCurrency }] },
    { model: Messenger, include: [{ model: VocabularyMessengerType }] },
    { model: Experience, include: [{ model: VocabularyPosition } ] },
    { model: LanguageSkill, include: [{ model: VocabularyLanguage }, { model: VocabularyLanguageLevel }] }
]

router.post('/api/applicants/create', middlewares, async (req, res) => {
    const applicantController = new ApplicantController(req.body);
    const newApplicant = await applicantController.create();
    const populatedApplicant = await Applicant.findByPk(newApplicant.id, { include: includeModels });

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
        include: includeModels,
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