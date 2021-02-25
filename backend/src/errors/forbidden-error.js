const CustomError = require('./custom-error');

class ForbiddenError extends CustomError {
    constructor() {
        super('Forbidden');

        this.statusCode = 403;

        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }

    serializeErrors(message, fields) {
        return [{ message: 'Forbidden' }];
    }
}

module.exports = ForbiddenError;