const { DataTypes, Model } = require('sequelize');

const sequelize = require('../util/database');

class LanguageSkill extends Model {}

LanguageSkill.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
}, { sequelize, modelName: 'languageSkill' });

module.exports = LanguageSkill;
