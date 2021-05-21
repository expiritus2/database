const express = require('express');
const requireAuth = require('../../middlewares/require-auth');
const Region = require('../../models/vocabulary/region');

const router = express.Router();

const middlewares = [requireAuth]

router.get('/api/vocabulary/regions', middlewares, async (req, res) => {
    const items = await Region.findAll({ attributes: ['id', 'label', 'value']});

    res.send(items);
});

router.post('/api/vocabulary/regions', middlewares, async(req, res) => {
    console.log(req.body);
    const items = await Region.create(req.body);
    res.send(items);
});

router.delete('/api/vocabulary/regions/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    await Region.destroy({ where: { id }});
    const items = await Region.findAll();
    res.send(items);
});

router.put('/api/vocabulary/regions/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    const item = await Region.findByPk(id);
    item.label = req.body.label;
    item.value = req.body.value;
    const updatedSkill = await item.save();

    res.send(updatedSkill);
});

module.exports = {
    regionsVocabularyRouter: router,
}