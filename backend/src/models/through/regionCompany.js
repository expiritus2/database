const { Model } = require('sequelize');
const sequelize = require('../../util/database');

class ThroughRegionCompany extends Model {}

ThroughRegionCompany.init({}, { sequelize, modelName: 'through_region_company', timestamps: false });

module.exports = ThroughRegionCompany;

