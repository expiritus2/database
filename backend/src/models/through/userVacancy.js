const { Model } = require('sequelize');
const sequelize = require('../../util/database');

class ThroughUserVacancy extends Model {}

ThroughUserVacancy.init({}, { sequelize, modelName: 'through_user_vacancy', timestamps: false });

module.exports = ThroughUserVacancy;

