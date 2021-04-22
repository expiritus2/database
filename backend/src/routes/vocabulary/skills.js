const express = require('express');
const requireAuth = require('../../middlewares/require-auth');
const Skill = require('../../models/skill');

const router = express.Router();

const middlewares = [requireAuth]

router.get('/api/vocabulary/skills', middlewares, async (req, res) => {
    const skills = await Skill.findAll({ attributes: ['id', 'label', 'value']});

    res.send(skills);
});

module.exports = {
    skillsVocabularyRouter: router,
}