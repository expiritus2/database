const express = require('express');
const requireAuth = require('../../middlewares/require-auth');
const Position = require('../../models/vocabulary/position');

const router = express.Router();

const middlewares = [requireAuth]

router.get('/api/vocabulary/positions', middlewares, async (req, res) => {
    const items = await Position.findAll({ attributes: ['id', 'label', 'value']});

    res.send(items);
});

router.post('/api/vocabulary/positions', middlewares, async(req, res) => {
    const items = await Position.create(req.body);
    res.send(items);
});

router.put('/api/vocabulary/positions', middlewares, async(req, res) => {
    await Position.destroy({ where: {}});
    const items = await Position.bulkCreate(req.body);
    res.send(items);
});

router.delete('/api/vocabulary/positions/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    await Position.destroy({ where: { id }});
    const items = await Position.findAll();
    res.send(items);
});

router.put('/api/vocabulary/positions/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    const item = await Position.findByPk(id);
    item.label = req.body.label;
    item.value = req.body.value;
    const updatedSkill = await item.save();

    res.send(updatedSkill);
});

module.exports = {
    positionsVocabularyRouter: router,
}