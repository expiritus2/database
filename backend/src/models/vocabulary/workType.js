const { DataTypes, Model } = require('sequelize');

const sequelize = require('../../util/database');

class WorkType extends Model {}

WorkType.init({
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
},{ sequelize, modelName: 'workType' });

module.exports = WorkType;