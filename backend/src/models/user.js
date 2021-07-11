const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');
// const ForbiddenError = require('../errors/forbidden-error');

const { roles } = require('../settings/constants/user');

const sequelize = require('../util/database');

class User extends Model {
    validPassword(password) {
        return bcrypt.compareSync(password, this.password)
    }

    static isSuperAdmin(email) {
        const superAdminEmails = JSON.parse(process.env.SUPER_ADMIN_EMAILS);
        return superAdminEmails.includes(email);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    displayName: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
    },
}, { sequelize, modelName: 'user' });

User.beforeCreate((user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
    user.role = User.isSuperAdmin(user.email) ? roles.SUPER_ADMIN : roles.ADMIN;
});

module.exports = User;