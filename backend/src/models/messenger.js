const { DataTypes, Model } = require('sequelize');

const sequelize = require('../util/database');

class Messenger extends Model {}

Messenger.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    accountName: {
        type: DataTypes.STRING,
    },
}, { sequelize, modelName: 'messenger' });

module.exports = Messenger;
