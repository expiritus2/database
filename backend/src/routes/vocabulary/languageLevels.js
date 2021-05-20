const express = require('express');
const requireAuth = require('../../middlewares/require-auth');
const LanguageLevel = require('../../models/languageLevel');

const router = express.Router();

const middlewares = [requireAuth]

router.get('/api/vocabulary/languageLevels', middlewares, async (req, res) => {
    const items = await LanguageLevel.findAll({ attributes: ['id', 'label', 'value']});

    res.send(items);
});

router.post('/api/vocabulary/languageLevels', middlewares, async(req, res) => {
    const items = await LanguageLevel.create(req.body);
    res.send(items);
});

router.delete('/api/vocabulary/languageLevels/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    await LanguageLevel.destroy({ where: { id }});
    const items = await LanguageLevel.findAll();
    res.send(items);
});

router.put('/api/vocabulary/languageLevels/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    const item = await LanguageLevel.findByPk(id);
    item.label = req.body.label;
    item.value = req.body.value;
    const updatedLanguageLevel = await item.save();

    res.send(updatedLanguageLevel);
});

module.exports = {
    languageLevelsVocabularyRouter: router,
}