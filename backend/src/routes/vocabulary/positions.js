const express = require('express');
const requireAuth = require('../../middlewares/require-auth');
const Position = require('../../models/position');

const router = express.Router();

const middlewares = [requireAuth]

router.get('/api/vocabulary/positions', middlewares, async (req, res) => {
    const positions = await Position.findAll({ attributes: ['id', 'label', 'value']});

    res.send(positions);
});

module.exports = {
    positionsVocabularyRouter: router,
}