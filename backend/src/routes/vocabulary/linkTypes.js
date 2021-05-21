const express = require('express');
const requireAuth = require('../../middlewares/require-auth');
const LinkType = require('../../models/vocabulary/linkType');

const router = express.Router();

const middlewares = [requireAuth]

router.get('/api/vocabulary/linkTypes', middlewares, async (req, res) => {
    const items = await LinkType.findAll({ attributes: ['id', 'label', 'value']});

    res.send(items);
});

router.post('/api/vocabulary/linkTypes', middlewares, async(req, res) => {
    const items = await LinkType.create(req.body);
    res.send(items);
});

router.delete('/api/vocabulary/linkTypes/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    await LinkType.destroy({ where: { id }});
    const items = await LinkType.findAll();
    res.send(items);
});

router.put('/api/vocabulary/linkTypes/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    const item = await LinkType.findByPk(id);
    item.label = req.body.label;
    item.value = req.body.value;
    const updatedLinkType = await item.save();

    res.send(updatedLinkType);
});

module.exports = {
    linkTypesVocabularyRouter: router,
}