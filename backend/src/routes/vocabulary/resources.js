const express = require('express');
const requireAuth = require('../../middlewares/require-auth');
const User = require('../../models/user');
const Position = require('../../models/vocabulary/position');
const Region = require('../../models/vocabulary/region');
const Skill = require('../../models/vocabulary/skill');

const router = express.Router();

const middlewares = [requireAuth]

router.get('/api/vocabulary/resources', middlewares, async (req, res) => {
    const users = await User.findAll({ attributes: ['id', 'email'] });
    const positions = await Position.findAll({ attributes: ['id', 'label', 'value']});
    const regions = await Region.findAll({ attributes: ['id', 'label', 'value']});
    const skills = await Skill.findAll({ attributes: ['id', 'label', 'value']});

    res.send({ users, positions, regions, skills });
});

module.exports = {
    resourcesVocabularyRouter: router,
}