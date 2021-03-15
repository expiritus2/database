const { DataTypes } = require('sequelize');

const sequelize = require('../util/database');

const Experience = sequelize.define('experience', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    company: {
        type: DataTypes.STRING,
    },
    info: {
        type: DataTypes.TEXT,
    },
    period: {
        type: DataTypes.ARRAY(DataTypes.BIGINT),
    }
}, {
    timestamps: true,
});

module.exports = Experience;
