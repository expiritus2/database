const express = require('express');
const { body } = require('express-validator');
const requireAuth = require('../../middlewares/require-auth');
const validateRequest = require('../../middlewares/validate-request');
const Contact = require('../../models/contact');

const { ContactController } = require('../../controllers/contact/contact');
const { includeModelsFull, attributesFull } = require('../../settings/contact');
const { getExecOptions } = require('./helpers');
const { getPaginatedItems } = require('../../util/handlers');

const router = express.Router();

const middlewares = [
    requireAuth,
    [
        body('positions').isArray().not().isEmpty().withMessage('Positions is required'),
        body('company').not().isEmpty().withMessage('Company is required'),
        body('name').not().isEmpty().withMessage('Name is required')
    ],
    validateRequest,
]

router.get('/api/contacts', requireAuth, async (req, res) => {
    const { options, isSearch, page, countPerPage } = getExecOptions(req.query);
    const allContacts = await Contact.findAndCountAll(options);

    if (isSearch) {
        const { pagedItems } = getPaginatedItems(allContacts.rows, page, countPerPage);
        return res.send({ result: { count: allContacts.count, rows: pagedItems } });
    }

    res.send({ result: allContacts });
});

router.get('/api/contacts/:id', requireAuth, async (req, res) => {
    const populatedContact = await Contact.findByPk(req.params.id, { include: includeModelsFull, attributes: attributesFull});

    res.send({ result: populatedContact });
})

router.post('/api/contacts/create', middlewares, async (req, res) => {
    const newContact = await new ContactController(req.body).create();

    res.send({ result: newContact });
});

router.put('/api/contacts/:id', middlewares, async (req, res) => {
    const updatedContact = await new ContactController(req.body).update(req.params.id);

    res.send({ result: updatedContact });
});

router.delete('/api/contacts/:id', async (req, res) => {
    await new ContactController().delete(req.params.id);
    const { options } = getExecOptions(req.query);
    const allContacts = await Contact.findAndCountAll(options);

    res.send({ result: allContacts });
});

module.exports = {
    contactRouter: router,
}