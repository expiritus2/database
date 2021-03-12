const { DataTypes } = require('sequelize');

const sequelize = require('../util/database');

const Phone = sequelize.define('phone', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    type: {
        type: DataTypes.CHAR(100)
    },
    number: {
        type: DataTypes.INTEGER,
    }
}, {
    timestamps: true,
});

module.exports = Phone;
