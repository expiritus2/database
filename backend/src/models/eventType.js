const { DataTypes, Model } = require('sequelize');

const sequelize = require('../util/database');

class EventType extends Model {}

EventType.init({
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
},{ sequelize, modelName: 'eventType' });

module.exports = EventType;
