const { Model } = require('sequelize');
const sequelize = require('../../util/database');

class ThroughVacancyPosition extends Model {}

ThroughVacancyPosition.init({}, { sequelize, modelName: 'through_vacancy_position', timestamps: false });

module.exports = ThroughVacancyPosition;

