const { Model } = require('sequelize');
const sequelize = require('../../util/database');

class ThroughCompanyUser extends Model {}

ThroughCompanyUser.init({}, { sequelize, modelName: 'through_company_user', timestamps: false });

module.exports = ThroughCompanyUser;

