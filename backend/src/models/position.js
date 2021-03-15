const { DataTypes } = require('sequelize');

const sequelize = require('../util/database');

const Position = sequelize.define('position', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    label: {
        type: DataTypes.CHAR(255),
    },
    value: {
        type: DataTypes.CHAR(255),
    }
}, {
    timestamps: true,
});

module.exports = Position;
