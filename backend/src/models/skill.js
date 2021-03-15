const { DataTypes } = require('sequelize');

const sequelize = require('../util/database');

const Skill = sequelize.define('skill', {
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

module.exports = Skill;
