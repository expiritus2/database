const { DataTypes, Model } = require('sequelize');

const sequelize = require('../util/database');

class Salary extends Model {}

Salary.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    amount: {
        type: DataTypes.STRING,
    },
}, { sequelize, modelName: 'salary' });

module.exports = Salary;
