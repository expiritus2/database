const express = require('express');
const { body } = require('express-validator');
const requireAuth = require('../middlewares/require-auth');
const validateRequest = require('../middlewares/validate-request');
const Contact = require('../models/contact');

const { ContactController } = require('../controllers/contactController');
const Sequelize = require('sequelize');

const router = express.Router();

const Op = Sequelize.Op;

const middlewares = [
    requireAuth,
    [body('name').not().isEmpty().withMessage('Name is required')],
    validateRequest,
]

router.post('/api/contacts/create', middlewares, async (req, res) => {
    const contactController = new ContactController(req.body);
    const newContact = await contactController.create();
    const populatedContact = await Contact.findByPk(newContact.id, { include: { all: true, nested: true } });

    res.send(populatedContact);
});

router.get('/api/contacts', requireAuth, async (req, res) => {
    const { page, countPerPage, search, active } = req.query || {};
    const searchCriteria = {
        where: {
            [Op.and]: [
                ...(search ? [{ name: { [Op.iLike]: `%${search}%` } }] : []),
                ...(active ? [{ active }] : []),
            ]
        }
    }

    const allContacts = await Contact.findAndCountAll({
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

router.put('/api/contacts/:id', async (req, res) => {
    const savedContact = new ContactController(req.body);
    const updatedContact = await savedContact.update(req.params.id);

    res.send(updatedContact);
})

module.exports = {
    contactRouter: router,
}