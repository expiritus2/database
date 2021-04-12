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
    logo: {
        type: DataTypes.STRING,
    },
    links: {
        type: DataTypes.JSONB,
    },
    addresses: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    },
    info: {
        type: DataTypes.TEXT,
    },
}, { sequelize, modelName: 'company' });

module.exports = Company;

