const { Model } = require('sequelize');
const sequelize = require('../../util/database');

class ThroughVacancyWorkType extends Model {}

ThroughVacancyWorkType.init({}, { sequelize, modelName: 'through_vacancy_workType', timestamps: false });

module.exports = ThroughVacancyWorkType;

