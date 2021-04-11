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
    salary: {
        type: DataTypes.JSONB,
    },
    experienceYears: {
        type: DataTypes.FLOAT,
    },
    place: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    },
    workSchedule: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    },
    test: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    },
    info: {
        type: DataTypes.TEXT,
    },
}, { sequelize, modelName: 'vacancy' });

module.exports = Vacancy;

