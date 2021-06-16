const { Model } = require('sequelize');
const sequelize = require('../../util/database');

class ThroughContactPosition extends Model {}

ThroughContactPosition.init({}, { sequelize, modelName: 'through_contact_position', timestamps: false });

module.exports = ThroughContactPosition;

