const express = require('express');
const requireAuth = require('../../middlewares/require-auth');
const Company = require('../../models/company');

const router = express.Router();

const middlewares = [requireAuth]

router.get('/api/vocabulary/companies', middlewares, async (req, res) => {
    const companies = await Company.findAll();

    res.send(companies);
});

module.exports = {
    companiesVocabularyRouter: router,
}