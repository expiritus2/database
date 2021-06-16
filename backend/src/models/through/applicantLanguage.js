const { Model } = require('sequelize');
const sequelize = require('../../util/database');

class ThroughApplicantLanguage extends Model {}

ThroughApplicantLanguage.init({}, { sequelize, modelName: 'through_applicant_language', timestamps: false });

module.exports = ThroughApplicantLanguage;

