const express = require('express');
const requireAuth = require('../../middlewares/require-auth');
const FileType = require('../../models/vocabulary/fileType');

const router = express.Router();

const middlewares = [requireAuth]

router.get('/api/vocabulary/fileTypes', middlewares, async (req, res) => {
    const items = await FileType.findAll({ attributes: ['id', 'label', 'value']});

    res.send(items);
});

router.post('/api/vocabulary/fileTypes', middlewares, async(req, res) => {
    const items = await FileType.create(req.body);
    res.send(items);
});

router.delete('/api/vocabulary/fileTypes/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    await FileType.destroy({ where: { id }});
    const items = await FileType.findAll();
    res.send(items);
});

router.put('/api/vocabulary/fileTypes/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    const item = await FileType.findByPk(id);
    item.label = req.body.label;
    item.value = req.body.value;
    const updatedFileType = await item.save();

    res.send(updatedFileType);
});

module.exports = {
    fileTypesVocabularyRouter: router,
}