const jwt = require('jsonwebtoken'); 
const Book = require("../models/book.model");

exports.isAuthorOrAdmin = async (req, res, next) => {
  const { bookId } = req.params;
  const user = req.user;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (
      book.author.toString() === user._id.toString() ||
      user.role === "admin"
    ) {
      return next();
    }

    return res.status(403).json({ message: "Access denied. Only the book author or an admin can perform this action." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
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
      console.log("Authenticated user:", request.user);

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

exports.isAuthorOrAdmin = async (req, res, next) => {
  const { bookId } = req.params;
  const user = req.user;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (
      book.author.toString() === user._id.toString() ||
      user.role === "admin"
    ) {
      return next();
    }

    return res.status(403).json({ message: "Access denied. Only the book author or an admin can perform this action." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.isAdmin = (request, response, next) => {
  if (request.user.role !== 'admin')
    return response.status(403).json({ error: 'Access denied. Admins only.' });
  next();
};


