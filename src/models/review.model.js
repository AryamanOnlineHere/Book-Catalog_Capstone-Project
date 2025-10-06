const mongoose = require("mongoose");

const reviewSchema=new mongoose.Schema({
    book:{type:mongoose.Schema.Types.ObjectId,ref:'Book'},
    rating:{type:Number,min:1,max:5},
    comment:{type:String},
    createdAt:{type:Date,default:Date.now},
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})
const Review=mongoose.model('Review',reviewSchema);

module.exports = Review;