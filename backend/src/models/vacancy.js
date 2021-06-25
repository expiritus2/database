const { DataTypes, Model } = require('sequelize');
const sequelize = require('../util/database');

class Vacancy extends Model {}

Vacancy.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    experienceYears: {
        type: DataTypes.FLOAT,
    },
    info: {
        type: DataTypes.TEXT,
    },
}, { sequelize, modelName: 'vacancy' });

module.exports = Vacancy;

