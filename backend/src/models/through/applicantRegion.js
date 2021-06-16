const { Model } = require('sequelize');
const sequelize = require('../../util/database');

class ThroughApplicantRegion extends Model {}

ThroughApplicantRegion.init({}, { sequelize, modelName: 'through_applicant_region', timestamps: false });

module.exports = ThroughApplicantRegion;

