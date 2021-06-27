const express = require('express');
const requireAuth = require('../../middlewares/require-auth');
const Activity = require('../../models/vocabulary/activity');

const router = express.Router();

const middlewares = [requireAuth]

router.get('/api/vocabulary/activities', middlewares, async (req, res) => {
    const items = await Activity.findAll({ attributes: ['id', 'label', 'value']});

    res.send(items);
});

router.post('/api/vocabulary/activities', middlewares, async(req, res) => {
    const items = await Activity.create(req.body);
    res.send(items);
});

router.put('/api/vocabulary/activities', middlewares, async(req, res) => {
    await Activity.destroy({ where: {}});
    const items = await Activity.bulkCreate(req.body);
    res.send(items);
});

router.delete('/api/vocabulary/activities/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    await Activity.destroy({ where: { id }});
    const items = await Activity.findAll();
    res.send(items);
});

router.put('/api/vocabulary/activities/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    const item = await Activity.findByPk(id);
    item.label = req.body.label;
    item.value = req.body.value;
    const updatedActivity = await item.save();

    res.send(updatedActivity);
});

module.exports = {
    activitiesVocabularyRouter: router,
}