const { Model } = require('sequelize');
const sequelize = require('../../util/database');

class ThroughVacancyWorkPlace extends Model {}

ThroughVacancyWorkPlace.init({}, { sequelize, modelName: 'through_vacancy_workPlace', timestamps: false });

module.exports = ThroughVacancyWorkPlace;

