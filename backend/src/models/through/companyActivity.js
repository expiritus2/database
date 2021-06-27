const { Model } = require('sequelize');
const sequelize = require('../../util/database');

class ThroughCompanyActivity extends Model {}

ThroughCompanyActivity.init({}, { sequelize, modelName: 'through_company_activity', timestamps: false });

module.exports = ThroughCompanyActivity;

