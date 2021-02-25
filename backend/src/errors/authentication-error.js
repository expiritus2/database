const CustomError = require('./custom-error');

class AuthenticationError extends CustomError {
    constructor() {
        super('Email or password not valid');

        this.statusCode = 400;

        Object.setPrototypeOf(this, AuthenticationError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}

module.exports = AuthenticationError;