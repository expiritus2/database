const express = require('express');

const requireAuth = require('../../middlewares/require-auth');
const FakeContactController = require('../../controllers/fake/contact');

const router = express.Router();

router.get('/api/fake/contacts', requireAuth, async (req, res) => {
    await new FakeContactController().create();
    res.send({ success: true });
});

router.delete('/api/fake/contacts', requireAuth, async (req, res) => {
    await new FakeContactController().delete();
    res.send({ success: true });
});

module.exports = {
    fakeContactRouter: router,
}