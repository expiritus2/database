const express = require('express');
const requireAuth = require('../../middlewares/require-auth');
const Skill = require('../../models/skill');

const router = express.Router();

const middlewares = [requireAuth]

router.get('/api/vocabulary/skills', middlewares, async (req, res) => {
    const skills = await Skill.findAll({ attributes: ['id', 'label', 'value']});

    res.send(skills);
});

router.post('/api/vocabulary/skills', middlewares, async(req, res) => {
    const skill = await Skill.create(req.body);
    res.send(skill);
});

router.delete('/api/vocabulary/skills/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    await Skill.destroy({ where: { id }});
    const skills = await Skill.findAll();
    res.send(skills);
});

router.put('/api/vocabulary/skills/:id', middlewares, async (req, res) => {
    const { id } = req.params;
    const skill = await Skill.findByPk(id);
    skill.label = req.body.label;
    skill.value = req.body.value;
    const updatedSkill = await skill.save();

    res.send(updatedSkill);
});

module.exports = {
    skillsVocabularyRouter: router,
}