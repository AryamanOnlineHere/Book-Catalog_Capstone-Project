const controller = require("../controllers/book.controller");
const ReviewController=require("../controllers/review.controller");
const {rating,comment}=require("../validation-rules/reviewValidator");
const { verifyToken, allowAuthorOrAdmin, isAdmin } = require("../middlewares/authJwt");
const { title, published, genre, description } = require('../validation-rules/bookValidationRules');
const path = "/api/books";

const validate = validations => {
  return async (req, res, next) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
    }
    next();
  };
};
module.exports = function (app) {
  // BOOK CRUD
  app.post(path, verifyToken, allowAuthorOrAdmin, validate([title, published, genre, description]), controller.addBook);
  app.get(path,controller.getall);
  app.put(`${path}/:bookId`, verifyToken, allowAuthorOrAdmin, controller.updateBookById);
  app.delete(`${path}/:bookId`, verifyToken, allowAuthorOrAdmin, controller.deleteBook); 

  // REVIEW CRUD
  app.post(`${path}/:bookId/reviews`, [verifyToken, allowAuthorOrAdmin, validate([rating, comment])], ReviewController.addReview);
  app.get(`${path}/:bookId/reviews`, ReviewController.getAllReview);
  app.put(`${path}/:reviewId/reviews`, [verifyToken, allowAuthorOrAdmin], ReviewController.updateReviewById);
  app.delete(`${path}/:reviewId/reviews`, [verifyToken, allowAuthorOrAdmin], ReviewController.deleteReview); 
};



 

