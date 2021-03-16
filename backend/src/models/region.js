const { DataTypes } = require('sequelize');

const sequelize = require('../util/database');

const Region = sequelize.define('region', {
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
        unique: true,
    }
}, {
    timestamps: true,
});

module.exports = Region;
