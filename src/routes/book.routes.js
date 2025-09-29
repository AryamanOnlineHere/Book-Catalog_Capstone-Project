const controller= require("../controllers/book.controller");
const ReviewController=require("../controllers/review.controller");
const {rating,comment}=require("../validation-rules/reviewValidator");

const {title,published,genre,author,description}= require('../validation-rules/bookValidationRules');
const path="/api/books";
const validate=validations=>{
    return async(request,response,next)=>{
        for(const validation of validations){
            const result =await validation.run(request);
            if(!result.isEmpty()){
                return response.status(400).json({errors: result.array()});
            }
        }
        next();
    };
};

module.exports=function(app){

    //BOOK CRUD
    app.post(path,validate([title,published,genre,author,description]),controller.addBook);
    app.get(path, controller.getall);
    app.put(`${path}/:bookId`,controller.updateBookById);
    app.delete(`${path}/:bookId`,controller.deleteBook);

    //Review CRUD
    app.post(`${path}/:bookId/reviews`,validate([rating,comment]),ReviewController.addReview);
    app.get(`${path}/:bookId/reviews`,ReviewController.getAllReview);
    app.put(`${path}/:reviewId/reviews`,ReviewController.updateReviewById);
    app.delete(`${path}/:reviewId/reviews`,ReviewController.deleteReview);
}

