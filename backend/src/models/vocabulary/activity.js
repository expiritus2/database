const { DataTypes, Model } = require('sequelize');

const sequelize = require('../../util/database');

class Activity extends Model {}

Activity.init({
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
},{ sequelize, modelName: 'activity' });

module.exports = Activity;
