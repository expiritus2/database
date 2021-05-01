const express = require('express');
const requireAuth = require('../../middlewares/require-auth');
const User = require('../../models/user');

const router = express.Router();

const middlewares = [requireAuth]

router.get('/api/users', middlewares, async (req, res) => {
    const users = await User.findAll({ attributes: ['id', 'email'] });

    res.send(users);
});

module.exports = {
    usersRouter: router,
}