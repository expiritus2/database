const { DataTypes, Model } = require('sequelize');

const sequelize = require('../../util/database');

class PhoneType extends Model {}

PhoneType.init({
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
},{ sequelize, modelName: 'phoneType' });

module.exports = PhoneType;
