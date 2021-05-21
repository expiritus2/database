const { DataTypes, Model } = require('sequelize');

const sequelize = require('../../util/database');

class WorkSchedule extends Model {}

WorkSchedule.init({
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
},{ sequelize, modelName: 'workSchedule' });

module.exports = WorkSchedule;