const { Model } = require('sequelize');
const sequelize = require('../../util/database');

class ThroughVacancyWorkSchedule extends Model {}

ThroughVacancyWorkSchedule.init({}, { sequelize, modelName: 'through_vacancy_workSchedule', timestamps: false });

module.exports = ThroughVacancyWorkSchedule;

