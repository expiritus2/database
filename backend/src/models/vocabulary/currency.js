const { DataTypes, Model } = require('sequelize');

const sequelize = require('../../util/database');

class Currency extends Model {}

Currency.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    label: {
        type: DataTypes.STRING,
    },
    value: {
        type: DataTypes.STRING,
    }
}, { sequelize, modelName: 'currency' });

module.exports = Currency;
