const { Model } = require('sequelize');
const sequelize = require('../../util/database');

class ThroughCompanyRegion extends Model {}

ThroughCompanyRegion.init({}, { sequelize, modelName: 'through_company_region', timestamps: false });

module.exports = ThroughCompanyRegion;

