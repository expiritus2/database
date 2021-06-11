const { DataTypes, Model } = require('sequelize');

const sequelize = require('../util/database');

class Phone extends Model {}

Phone.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    number: {
        type: DataTypes.STRING,
    },
}, { sequelize, modelName: 'phone' });

module.exports = Phone;
