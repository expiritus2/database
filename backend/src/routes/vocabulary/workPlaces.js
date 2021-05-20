const express = require('express');
const requireAuth = require('../../middlewares/require-auth');
const Place = require('../../models/workPlace');

const router = express.Router();

const middlewares = [requireAuth]

router.get('/api/vocabulary/workPlaces', middlewares, async (req, res) => {
    const items = await Place.findAll({ attributes: ['id', 'label', 'value']});

    res.send(items);
});

router.post('/api/vocabulary/workPlaces', middlewares, async(req, res) => {
    const items = await Place.create(req.body);
    res.send(items);
});

router.delete('/api/vocabulary/workPlaces/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    await Place.destroy({ where: { id }});
    const items = await Place.findAll();
    res.send(items);
});

router.put('/api/vocabulary/workPlaces/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    const item = await Place.findByPk(id);
    item.label = req.body.label;
    item.value = req.body.value;
    const updatedPlace = await item.save();

    res.send(updatedPlace);
});

module.exports = {
    workPlacesVocabularyRouter: router,
}