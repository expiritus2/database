const express = require('express');
const requireAuth = require('../../middlewares/require-auth');
const Region = require('../../models/region');

const router = express.Router();

const middlewares = [requireAuth]

router.get('/api/vocabulary/regions', middlewares, async (req, res) => {
    const regions = await Region.findAll({ attributes: ['id', 'label', 'value']});

    res.send(regions);
});

module.exports = {
    regionsRouter: router,
}