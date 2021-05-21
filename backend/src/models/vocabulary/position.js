const { DataTypes, Model } = require('sequelize');

const sequelize = require('../../util/database');

class Position extends Model {}

Position.init({
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
}, { sequelize, modelName: 'position' });

module.exports = Position;
