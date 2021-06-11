const { DataTypes, Model } = require('sequelize');

const sequelize = require('../util/database');

class ApplicantLanguage extends Model {}

ApplicantLanguage.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
}, { sequelize, modelName: 'applicantLanguage' });

module.exports = ApplicantLanguage;
