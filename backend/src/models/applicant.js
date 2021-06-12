const { DataTypes, Model } = require('sequelize');
const sequelize = require('../util/database');

class Applicant extends Model {}

Applicant.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    nameLat: {
        type: DataTypes.STRING,
    },
    inActiveSearch: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    experienceYears: {
        type: DataTypes.FLOAT,
    },
    address: {
        type: DataTypes.STRING,
    },
    info: {
        type: DataTypes.TEXT,
    },
    birthDate: {
        type: DataTypes.DATE,
    },
}, { sequelize, modelName: 'applicant' });

module.exports = Applicant;

