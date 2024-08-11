const jwtService = require('../services/jwtServices')
const asyncHandler = require('express-async-handler');


const verifyJWT = async(req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("auth header received "+authHeader)

  // Check if authorization header is present and formatted correctly
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token

  // Verify the token using JWT secret
  try{
    const decoded = await jwtService.verifyToken(token);
    req.user = decoded;
    next();
  }catch(err){
      // Handle JWT verification errors (e.g., invalid signature, expired token)
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).send({ message: 'Invalid token' });
      } else if (err.name === 'TokenExpiredError') {
        return res.status(401).send({ message: 'Token expired' });
      } else {
        // Handle other errors (e.g., database errors during verification)
        console.error('Error verifying JWT:', err);
        return res.status(500).send({ message: 'Internal server error' });
      }
    };
  
};

module.exports = verifyJWT;
