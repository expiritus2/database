const { DataTypes, Model } = require('sequelize');

const sequelize = require('../../util/database');

class Education extends Model {}

Education.init({
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
}, { sequelize, modelName: 'vocabularyEducation' });

module.exports = Education;
