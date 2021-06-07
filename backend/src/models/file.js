const { DataTypes, Model } = require('sequelize');

const sequelize = require('../util/database');

class File extends Model {}

File.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    contentType: {
        type: DataTypes.STRING,
    },
    filename: {
        type: DataTypes.STRING,
    },
    size: {
        type: DataTypes.DECIMAL,
    },
    url: {
        type: DataTypes.STRING,
    },
}, { sequelize, modelName: 'file' });

module.exports = File;
