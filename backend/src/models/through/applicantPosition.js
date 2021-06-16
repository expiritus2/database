const { Model } = require('sequelize');
const sequelize = require('../../util/database');

class ThroughApplicantPosition extends Model {}

ThroughApplicantPosition.init({}, { sequelize, modelName: 'through_applicant_position', timestamps: false });

module.exports = ThroughApplicantPosition;

