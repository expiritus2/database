const express = require('express');
const { passport } = require('../passport');

const router = express.Router();

router.get('/api/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/api/auth/google/callback', passport.authenticate('google', {
    successRedirect: 'http://localhost:8080/user',
    failureRedirect: 'http://localhost:8080'
}));

module.exports = {
    authRouter: router,
}
