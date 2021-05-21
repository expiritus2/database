const express = require('express');
const requireAuth = require('../../middlewares/require-auth');
const EventType = require('../../models/vocabulary/eventType');

const router = express.Router();

const middlewares = [requireAuth]

router.get('/api/vocabulary/eventTypes', middlewares, async (req, res) => {
    const items = await EventType.findAll({ attributes: ['id', 'label', 'value']});

    res.send(items);
});

router.post('/api/vocabulary/eventTypes', middlewares, async(req, res) => {
    const items = await EventType.create(req.body);
    res.send(items);
});

router.delete('/api/vocabulary/eventTypes/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    await EventType.destroy({ where: { id }});
    const items = await EventType.findAll();
    res.send(items);
});

router.put('/api/vocabulary/eventTypes/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    const item = await EventType.findByPk(id);
    item.label = req.body.label;
    item.value = req.body.value;
    const updatedEventType = await item.save();

    res.send(updatedEventType);
});

module.exports = {
    eventTypesVocabularyRouter: router,
}