const { DataTypes, Model } = require('sequelize');

const sequelize = require('../../util/database');

class FileType extends Model {}

FileType.init({
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
},{ sequelize, modelName: 'fileType' });

module.exports = FileType;
