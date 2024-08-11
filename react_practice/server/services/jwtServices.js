// jwtService.js
const jwt = require('jsonwebtoken');

class JWTService {
  constructor(secret) {
    this.secret = secret;
  }

  signToken(payload, options) {
    return jwt.sign(payload, this.secret, options.expiresIn);
  }

  verifyToken(token) {
    return new Promise((resolve, reject) => { // Return a Promise
      jwt.verify(token, this.secret, (err, decoded) => {
        if (err) {
          reject(err); // Reject with error on verification failure
        } else {
          resolve(decoded); // Resolve with decoded data on success
        }
      });
    });
  }
}

module.exports = new JWTService(process.env.JWT_SECRET); // Export an instance with the secret
