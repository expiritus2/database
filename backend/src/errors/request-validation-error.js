const CustomError = require('./custom-error');

class RequestValidationError extends CustomError {
    constructor(errors) {
        super('Invalid request parameters');

        this.statusCode = 400;

        Object.setPrototypeOf(this, RequestValidationError.prototype);

        this.errors = errors;
    }

    serializeErrors() {
        return this.errors.map((err) => {
            return { message: err.msg, fields: err.param };
        })
    }
}

module.exports = RequestValidationError;