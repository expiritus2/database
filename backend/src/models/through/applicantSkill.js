const { Model } = require('sequelize');
const sequelize = require('../../util/database');

class ThroughApplicantSkill extends Model {}

ThroughApplicantSkill.init({}, { sequelize, modelName: 'through_applicant_skills', timestamps: false });

module.exports = ThroughApplicantSkill;

