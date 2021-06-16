const { Model } = require('sequelize');
const sequelize = require('../../util/database');

class ThroughExperiencePosition extends Model {}

ThroughExperiencePosition.init({}, { sequelize, modelName: 'through_experience_position', timestamps: false });

module.exports = ThroughExperiencePosition;

