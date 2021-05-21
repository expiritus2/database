const { DataTypes, Model } = require('sequelize');

const sequelize = require('../../util/database');

class LanguageLevel extends Model {}

LanguageLevel.init({
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
},{ sequelize, modelName: 'languageLevel' });

module.exports = LanguageLevel;
