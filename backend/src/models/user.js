const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const ForbiddenError = require('../errors/forbidden-error');

const { ADMIN, SUPER_ADMIN } = require('../constants/roles');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
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
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: ADMIN,
    }
}, {
    timestamps: true,
});

User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

User.prototype.isSuperAdmin = function (email) {
    const superAdminEmail = JSON.parse(process.env.SUPER_ADMIN_EMAILS);
    return superAdminEmail.includes(email);
}

User.beforeCreate((user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
    user.role = user.isSuperAdmin(user.email) ? SUPER_ADMIN : ADMIN;

    if (user.role !== SUPER_ADMIN) {
        throw new ForbiddenError();
    }
});

module.exports = User;