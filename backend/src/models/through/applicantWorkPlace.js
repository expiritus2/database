const { Model } = require('sequelize');
const sequelize = require('../../util/database');

class ThroughApplicantWorkPlace extends Model {}

ThroughApplicantWorkPlace.init({}, { sequelize, modelName: 'through_applicant_workPlace', timestamps: false });

module.exports = ThroughApplicantWorkPlace;

