
const { body } = require('express-validator');
const generEnum=['action','thriller'];

exports.title = body('title').notEmpty().withMessage('Title is required').isLength({ max: 10 }).withMessage('Title cannot exceed 10 characters')

exports.genre = body('genre').notEmpty().isIn(generEnum).withMessage('Genre is required').isLength({ max: 12 }).withMessage('Genre cannot exceed 12 characters')

exports.author = body('author').notEmpty().withMessage('Author is required').isLength({ max: 20 }).withMessage('Author cannot exceed 20 characters')

exports.description = body('description').notEmpty().withMessage('Description is required').isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters')