const express = require('express');
const requireAuth = require('../../middlewares/require-auth');
const Language = require('../../models/vocabulary/language');

const router = express.Router();

const middlewares = [requireAuth]

router.get('/api/vocabulary/languages', middlewares, async (req, res) => {
    const items = await Language.findAll({ attributes: ['id', 'label', 'value']});

    res.send(items);
});

router.post('/api/vocabulary/languages', middlewares, async(req, res) => {
    const items = await Language.create(req.body);
    res.send(items);
});

router.delete('/api/vocabulary/languages/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    await Language.destroy({ where: { id }});
    const items = await Language.findAll();
    res.send(items);
});

router.put('/api/vocabulary/languages/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    const item = await Language.findByPk(id);
    item.label = req.body.label;
    item.value = req.body.value;
    const updatedLanguage = await item.save();

    res.send(updatedLanguage);
});

module.exports = {
    languagesVocabularyRouter: router,
}