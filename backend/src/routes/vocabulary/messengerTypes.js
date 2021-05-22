const express = require('express');
const requireAuth = require('../../middlewares/require-auth');
const MessengerType = require('../../models/vocabulary/messengerType');

const router = express.Router();

const middlewares = [requireAuth]

router.get('/api/vocabulary/messengerTypes', middlewares, async (req, res) => {
    const items = await MessengerType.findAll({ attributes: ['id', 'label', 'value']});

    res.send(items);
});

router.post('/api/vocabulary/messengerTypes', middlewares, async(req, res) => {
    const items = await MessengerType.create(req.body);
    res.send(items);
});

router.put('/api/vocabulary/messengerTypes', middlewares, async(req, res) => {
    await MessengerType.destroy({ where: {}});
    const items = await MessengerType.bulkCreate(req.body);
    res.send(items);
});

router.delete('/api/vocabulary/messengerTypes/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    await MessengerType.destroy({ where: { id }});
    const items = await MessengerType.findAll();
    res.send(items);
});

router.put('/api/vocabulary/messengerTypes/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    const item = await MessengerType.findByPk(id);
    item.label = req.body.label;
    item.value = req.body.value;
    const updatedMessengerType = await item.save();

    res.send(updatedMessengerType);
});

module.exports = {
    messengerTypesVocabularyRouter: router,
}