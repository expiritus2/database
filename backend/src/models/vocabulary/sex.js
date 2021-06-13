const { DataTypes, Model } = require('sequelize');

const sequelize = require('../../util/database');

class Sex extends Model {}

Sex.init({
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
},{ sequelize, modelName: 'sex' });

module.exports = Sex;
