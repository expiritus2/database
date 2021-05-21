const express = require('express');
const requireAuth = require('../../middlewares/require-auth');
const PhoneType = require('../../models/vocabulary/eventType');

const router = express.Router();

const middlewares = [requireAuth]

router.get('/api/vocabulary/phoneTypes', middlewares, async (req, res) => {
    const items = await PhoneType.findAll({ attributes: ['id', 'label', 'value']});

    res.send(items);
});

router.post('/api/vocabulary/phoneTypes', middlewares, async(req, res) => {
    const items = await PhoneType.create(req.body);
    res.send(items);
});

router.delete('/api/vocabulary/phoneTypes/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    await PhoneType.destroy({ where: { id }});
    const items = await PhoneType.findAll();
    res.send(items);
});

router.put('/api/vocabulary/phoneTypes/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    const item = await PhoneType.findByPk(id);
    item.label = req.body.label;
    item.value = req.body.value;
    const updatedPhoneType = await item.save();

    res.send(updatedPhoneType);
});

module.exports = {
    phoneTypesVocabularyRouter: router,
}