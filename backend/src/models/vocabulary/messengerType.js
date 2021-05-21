const { DataTypes, Model } = require('sequelize');

const sequelize = require('../../util/database');

class MessengerType extends Model {}

MessengerType.init({
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
},{ sequelize, modelName: 'messengerType' });

module.exports = MessengerType;
