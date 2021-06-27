const { Model } = require('sequelize');
const sequelize = require('../../util/database');

class ThroughVacancyUser extends Model {}

ThroughVacancyUser.init({}, { sequelize, modelName: 'through_vacancy_user', timestamps: false });

module.exports = ThroughVacancyUser;

