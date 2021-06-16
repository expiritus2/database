const { Model } = require('sequelize');
const sequelize = require('../../util/database');

class ThroughUserCompany extends Model {}

ThroughUserCompany.init({}, { sequelize, modelName: 'through_user_company', timestamps: false });

module.exports = ThroughUserCompany;

