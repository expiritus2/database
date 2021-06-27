const { DataTypes, Model } = require('sequelize');
const sequelize = require('../util/database');

class Company extends Model {}

Company.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    info: {
        type: DataTypes.TEXT,
    },
}, { sequelize, modelName: 'company' });

module.exports = Company;

