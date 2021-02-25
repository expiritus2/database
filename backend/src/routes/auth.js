const express = require('express');
const { passport } = require('../passport');

const router = express.Router();

router.post('/api/auth/login', passport.authenticate('local'), (req, res) => {
    if (req.user) {
        return res.send({ user: req.user });
    }
    return res.send({ user: null });
});

router.get('/api/auth/current-user', (req, res) => {
    res.send({ user: req.user });
});

router.get('/api/auth/logout', async (req, res) => {
    await req.logOut();
    res.send({ success: true });
})

module.exports = {
    authRouter: router,
}
