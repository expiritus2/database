const express = require('express');
const requireAuth = require('../../middlewares/require-auth');
const Sex = require('../../models/vocabulary/sex');

const router = express.Router();

const middlewares = [requireAuth]

router.get('/api/vocabulary/sexs', middlewares, async (req, res) => {
    const items = await Sex.findAll({ attributes: ['id', 'label', 'value']});

    res.send(items);
});

router.post('/api/vocabulary/sexs', middlewares, async(req, res) => {
    const items = await Sex.create(req.body);
    res.send(items);
});

router.put('/api/vocabulary/sexs', middlewares, async(req, res) => {
    await Sex.destroy({ where: {}});
    const items = await Sex.bulkCreate(req.body);
    res.send(items);
});

router.delete('/api/vocabulary/sexs/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    await Sex.destroy({ where: { id }});
    const items = await Sex.findAll();
    res.send(items);
});

router.put('/api/vocabulary/sexs/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    const item = await Sex.findByPk(id);
    item.label = req.body.label;
    item.value = req.body.value;
    const updatedSex = await item.save();

    res.send(updatedSex);
});

module.exports = {
    sexsVocabularyRouter: router,
}