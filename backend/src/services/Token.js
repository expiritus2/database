const jwt = require('jsonwebtoken');

class Token {
    static sign(params, salt = process.env.TOKEN_SALT, options = { expiresIn: '1 days'}) {
        return jwt.sign(params, salt, options);
    }

    static verify(token, salt = process.env.TOKEN_SALT) {
        return jwt.verify(token, salt);
    }
}

module.exports = Token;