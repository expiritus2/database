const express = require('express');
const requireAuth = require('../../middlewares/require-auth');
const User = require('../../models/user');
const UserController = require('../../controllers/user');
const validateRequest = require('../../middlewares/validate-request');

const router = express.Router();

const middlewares = [requireAuth, validateRequest]

router.get('/api/users', middlewares, async (req, res) => {
    const users = await User.findAll({ attributes: ['id', 'email'] });

    res.send(users);
});

router.post('/api/users/update', middlewares, async (req, res) => {
    const user = await new UserController(req.user, req.body).update();

    res.send({ user });
});

module.exports = {
    usersRouter: router,
}