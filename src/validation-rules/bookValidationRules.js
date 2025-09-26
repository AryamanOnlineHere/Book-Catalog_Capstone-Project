
const { body } = require('express-validator');
const generEnum=['action','thriller'];

exports.title = body('title').notEmpty().withMessage('Title is required').isLength({ max: 10 }).withMessage('Title cannot exceed 10 characters')

exports.genre = body('genre').notEmpty().isIn(generEnum).withMessage('Genre is required').isLength({ max: 12 }).withMessage('Genre cannot exceed 12 characters')

exports.published = body('published')
  .optional()
  .isISO8601().withMessage('Published date must be a valid date')
  .custom((value) => {
    const inputDate = new Date(value);
    const now = new Date();
    if (inputDate > now) {
      throw new Error('Published date cannot be in the future');
    }
    return true;
  });


exports.author = body('author').notEmpty().withMessage('Author is required').isLength({ max: 20 }).withMessage('Author cannot exceed 20 characters')

exports.description = body('description').notEmpty().withMessage('Description is required').isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters')