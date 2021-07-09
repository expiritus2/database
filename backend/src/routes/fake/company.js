const express = require('express');

const requireAuth = require('../../middlewares/require-auth');
const FakeCompanyController = require('../../controllers/fake/company');

const router = express.Router();

router.get('/api/fake/companies', requireAuth, async (req, res) => {
    await new FakeCompanyController().create();
    res.send({ success: true });
});

router.delete('/api/fake/companies', requireAuth, async (req, res) => {
    await new FakeCompanyController().delete();
    res.send({ success: true });
});

module.exports = {
    fakeCompanyRouter: router,
}