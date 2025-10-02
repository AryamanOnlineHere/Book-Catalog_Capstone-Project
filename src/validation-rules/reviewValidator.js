const { body } = require('express-validator');
exports.rating=body('rating').notEmpty().withMessage("Rating is required");
exports.comment=body('comment').notEmpty().withMessage("Comment is required").isLength({max:10}).withMessage("comment should be within 10 charesters").trim();