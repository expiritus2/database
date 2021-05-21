const express = require('express');
const requireAuth = require('../../middlewares/require-auth');
const WorkSchedule = require('../../models/vocabulary/workSchedule');

const router = express.Router();

const middlewares = [requireAuth]

router.get('/api/vocabulary/workSchedules', middlewares, async (req, res) => {
    const items = await WorkSchedule.findAll({ attributes: ['id', 'label', 'value']});

    res.send(items);
});

router.post('/api/vocabulary/workSchedules', middlewares, async(req, res) => {
    const items = await WorkSchedule.create(req.body);
    res.send(items);
});

router.delete('/api/vocabulary/workSchedules/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    await WorkSchedule.destroy({ where: { id }});
    const items = await WorkSchedule.findAll();
    res.send(items);
});

router.put('/api/vocabulary/workSchedules/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    const item = await WorkSchedule.findByPk(id);
    item.label = req.body.label;
    item.value = req.body.value;
    const updatedWorkSchedule = await item.save();

    res.send(updatedWorkSchedule);
});

module.exports = {
    workSchedulesVocabularyRouter: router,
}