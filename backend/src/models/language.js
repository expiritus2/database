const { DataTypes, Model } = require('sequelize');

const sequelize = require('../util/database');

class Language extends Model {}

Language.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
}, { sequelize, modelName: 'language' });

module.exports = Language;
