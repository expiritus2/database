const express = require('express');
const requireAuth = require('../../middlewares/require-auth');
const Education = require('../../models/vocabulary/position');

const router = express.Router();

const middlewares = [requireAuth]

router.get('/api/vocabulary/educations', middlewares, async (req, res) => {
    const items = await Education.findAll({ attributes: ['id', 'label', 'value']});

    res.send(items);
});

router.post('/api/vocabulary/educations', middlewares, async(req, res) => {
    const items = await Education.create(req.body);
    res.send(items);
});

router.put('/api/vocabulary/educations', middlewares, async(req, res) => {
    await Education.destroy({ where: {}});
    const items = await Education.bulkCreate(req.body);
    res.send(items);
});

router.delete('/api/vocabulary/educations/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    await Education.destroy({ where: { id }});
    const items = await Education.findAll();
    res.send(items);
});

router.put('/api/vocabulary/educations/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    const item = await Education.findByPk(id);
    item.label = req.body.label;
    item.value = req.body.value;
    const updatedSkill = await item.save();

    res.send(updatedSkill);
});

module.exports = {
    educationsVocabularyRouter: router,
}