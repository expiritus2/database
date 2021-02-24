const express = require('express');
const { passport } = require('../passport');

const router = express.Router();

const passportMiddleware = passport.authenticate('local');

router.post('/api/auth/login', passportMiddleware, (req, res) => {
    if (req.user) {
        return res.send({ user: req.user });
    }
    return res.send({ user: null });
});

router.get('/api/auth/current-user', (req, res) => {
    res.send({ user: req.user });
});

module.exports = {
    authRouter: router,
}
