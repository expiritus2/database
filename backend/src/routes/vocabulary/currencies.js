const express = require('express');
const requireAuth = require('../../middlewares/require-auth');
const Currency = require('../../models/vocabulary/currency');

const router = express.Router();

const middlewares = [requireAuth]

router.get('/api/vocabulary/currencies', middlewares, async (req, res) => {
    const items = await Currency.findAll({ attributes: ['id', 'label', 'value']});

    res.send(items);
});

router.post('/api/vocabulary/currencies', middlewares, async(req, res) => {
    const items = await Currency.create(req.body);
    res.send(items);
});

router.put('/api/vocabulary/currencies', middlewares, async(req, res) => {
    await Currency.destroy({ where: {}});
    const items = await Currency.bulkCreate(req.body);
    res.send(items);
});

router.delete('/api/vocabulary/currencies/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    await Currency.destroy({ where: { id }});
    const items = await Currency.findAll();
    res.send(items);
});

router.put('/api/vocabulary/currencies/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    const item = await Currency.findByPk(id);
    item.label = req.body.label;
    item.value = req.body.value;
    const updatedSkill = await item.save();

    res.send(updatedSkill);
});

module.exports = {
    currenciesVocabularyRouter: router,
}