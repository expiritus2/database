const { DataTypes, Model } = require('sequelize');

const sequelize = require('../util/database');

class SalaryRange extends Model {}

SalaryRange.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    min: {
        type: DataTypes.STRING,
    },
    max: {
        type: DataTypes.STRING,
    },
}, { sequelize, modelName: 'salaryRange' });

module.exports = SalaryRange;
