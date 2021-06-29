const express = require('express');
const requireAuth = require('../../middlewares/require-auth');
const Contact = require('../../models/contact');

const router = express.Router();

const middlewares = [requireAuth]

router.get('/api/vocabulary/contacts', middlewares, async (req, res) => {
    const contacts = await Contact.findAll({ attributes: ['id', 'name'] });

    res.send(contacts);
});

module.exports = {
    contactsVocabularyRouter: router,
}