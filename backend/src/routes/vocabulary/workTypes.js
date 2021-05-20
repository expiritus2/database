const express = require('express');
const requireAuth = require('../../middlewares/require-auth');
const WorkType = require('../../models/workType');

const router = express.Router();

const middlewares = [requireAuth]

router.get('/api/vocabulary/workTypes', middlewares, async (req, res) => {
    const items = await WorkType.findAll({ attributes: ['id', 'label', 'value']});

    res.send(items);
});

router.post('/api/vocabulary/workTypes', middlewares, async(req, res) => {
    const items = await WorkType.create(req.body);
    res.send(items);
});

router.delete('/api/vocabulary/workTypes/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    await WorkType.destroy({ where: { id }});
    const items = await WorkType.findAll();
    res.send(items);
});

router.put('/api/vocabulary/workTypes/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    const item = await WorkType.findByPk(id);
    item.label = req.body.label;
    item.value = req.body.value;
    const updatedWorkType = await item.save();

    res.send(updatedWorkType);
});

module.exports = {
    workTypesVocabularyRouter: router,
}