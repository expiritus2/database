const sequelize = require('../util/database');

const Position = sequelize.define('applicant_position', {

}, { timestamps: false });

module.exports = Position;
