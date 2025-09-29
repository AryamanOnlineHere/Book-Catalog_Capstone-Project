const { response } = require("express");
const Review=require("../models/review.model");

// Review CRUD operations
exports.addReview = async (request, response) => {
    try {
        const { rating, comment } = request.body;
        const { bookId } = request.params;

        const review = new Review({
            book: bookId,
            rating,
            comment
        });
        const savedReview = await review.save();
        response.status(201).json(savedReview);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
};

exports.getAllReview = async (request, response) => {
    const { bookId } = request.params;
    const reviews = await Review.find({ book: bookId });

    response.status(200).json(reviews);
}

exports.updateReviewById= async(request,response)=>{
    try {
         const {reviewId}=request.params;
         const updateData=request.body;

         const updateReview=await Review.findByIdAndUpdate(reviewId,updateData,{
            new:true,
            runValidators:true
         })
         if(!updateReview){
            return response.status(404).json({message:"Review not found"});
         }
         response.status(200).json(updateReview);
    } catch (error) {
        response.status(400).json({message:"message not found"});
        
    }
}
exports.deleteReview=async(request,response)=>{
    try {
        const{reviewId}=request.params;
        
        const deleteReview=await Review.findByIdAndDelete(reviewId);
        if(!deleteReview){
            return response.status(404).jsone({message:"Review not deleted"});
        }
        response.status(200).json({message:"Review sucessfully Deleted",Review:reviewId});
        
    } catch (error) {
        response.status(400).json({message:error.message});
        
    }
}