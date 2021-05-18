const express = require('express');
const requireAuth = require('../../middlewares/require-auth');
const Skill = require('../../models/skill');

const router = express.Router();

const middlewares = [requireAuth]

router.get('/api/vocabulary/skills', middlewares, async (req, res) => {
    const items = await Skill.findAll({ attributes: ['id', 'label', 'value']});

    res.send(items);
});

router.post('/api/vocabulary/skills', middlewares, async(req, res) => {
    const items = await Skill.create(req.body);
    res.send(items);
});

router.delete('/api/vocabulary/skills/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    await Skill.destroy({ where: { id }});
    const items = await Skill.findAll();
    res.send(items);
});

router.put('/api/vocabulary/skills/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    const item = await Skill.findByPk(id);
    item.label = req.body.label;
    item.value = req.body.value;
    const updatedSkill = await item.save();

    res.send(updatedSkill);
});

module.exports = {
    skillsVocabularyRouter: router,
}