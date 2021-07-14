const express = require('express');
const { passport } = require('../../passport');
const EnrollAccountController = require('../../controllers/auth/Enroll');
const Invite = require('../../controllers/auth/Invite');

const router = express.Router();

router.post('/api/auth/login', passport.authenticate('local'), (req, res) => {
    if (req.user) {
        return res.send({ user: req.user });
    }
    return res.send({ user: null });
});

router.post('/api/auth/enrollAccount', async (req, res) => {
    const result = await new EnrollAccountController(req.body, req.user).result();

    res.send({ user: result });
});

router.post('/api/auth/invite', async (req, res) => {
    const result = await new Invite(req.body, req.user).sendMail();

    res.send({ user: result });
});

router.get('/api/auth/current-user', (req, res) => {
    res.send({ user: req.user || {} });
});

router.get('/api/auth/logout', async (req, res) => {
    await req.logOut();
    res.send({ user: {} });
})

module.exports = {
    authRouter: router,
}
