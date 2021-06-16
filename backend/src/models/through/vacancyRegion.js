const { Model } = require('sequelize');
const sequelize = require('../../util/database');

class ThroughVacancyRegion extends Model {}

ThroughVacancyRegion.init({}, { sequelize, modelName: 'through_vacancy_region', timestamps: false });

module.exports = ThroughVacancyRegion;

