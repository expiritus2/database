const { DataTypes, Model } = require('sequelize');

const sequelize = require('../util/database');

class Link extends Model {}

Link.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
}, { sequelize, modelName: 'address' });

module.exports = Link;
