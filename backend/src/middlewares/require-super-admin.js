const ForbiddenError = require('../errors/forbidden-error');

const requireSuperAdmin = (req, res, next) => {
    if (req.user && !req.user.isSuperAdmin()) {
        throw new ForbiddenError()
    }

    next();
}

module.exports = requireSuperAdmin;