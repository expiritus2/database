const { Model } = require('sequelize');
const sequelize = require('../../util/database');

class ThroughVacancyContact extends Model {}

ThroughVacancyContact.init({}, { sequelize, modelName: 'through_vacancy_contacts', timestamps: false });

module.exports = ThroughVacancyContact;

