const jwt = require('jsonwebtoken'); 
const User=require("../models/user.model")

exports.verifyToken = async (request, response, next) => {
  const authHeader = request.headers["x-access-token"];
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return response.status(401).json({ error: 'Access denied. No token provided.' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.id);
    if (!user) {
      return response.status(401).json({ error: 'User not found.' });
    }

    request.user = user; 
    next();
  } catch (err) {
    response.status(401).json({ error: 'Invalid token.' });
    console.log(err);
  }
};

exports.allowAuthorOrAdmin = (request, response, next) => {
  if (request.user.role === 'author' || request.user.role === 'admin') {
    return next();
  }
  return response.status(403).json({ error: 'Access denied. Authors or Admins only.' });
};

exports.isAdmin = (request, response, next) => {
  if (request.user.role !== 'admin')
    return response.status(403).json({ error: 'Access denied. Admins only.' });
  next();
};


