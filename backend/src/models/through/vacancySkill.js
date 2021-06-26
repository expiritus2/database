const { Model } = require('sequelize');
const sequelize = require('../../util/database');

class ThroughVacancySkill extends Model {}

ThroughVacancySkill.init({}, { sequelize, modelName: 'through_vacancy_skills', timestamps: false });

module.exports = ThroughVacancySkill;

