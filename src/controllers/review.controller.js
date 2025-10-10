const { response } = require("express");
const Review = require("../models/review.model");

// Review CRUD operations
exports.addReview = async (request, response) => {
  try {
    const { rating, comment } = request.body;
    const { bookId } = request.params;

    const review = new Review({
      book: bookId,
      rating,
      comment,
      reviewer: request.user._id,
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
};

exports.updateReviewById = async (request, response) => {
  try {
    const { reviewId } = request.params;
    const updateData = request.body;

console.log("Review ID:", reviewId);


    const review = await Review.findById(reviewId);
    if (!review) {
      return response.status(404).json({ message: "Review not found" });
    }

    // Check if the logged-in user is the reviewer
    if (
      !review.reviewer.equals(request.user._id) &&
      request.user.role !== "admin"
    ) {
      return response.status(403).json({
        message:
          "Access denied. Only the reviewer or an admin can perform this action.",
      });
    }

    const updatedReview = await Review.findByIdAndUpdate(reviewId, updateData, {
      new: true,
      runValidators: true,
    });

    response.status(200).json(updatedReview);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

exports.deleteReview = async (request, response) => {
  try {
    const { reviewId } = request.params;

    const review = await Review.findById(reviewId);
    if (!review) {
      return response.status(404).json({ message: "Review not found" });
    }

    // Check if the logged-in user is the reviewer
    if (
      !review.reviewer.equals(request.user._id) &&
      request.user.role !== "admin"
    ) {
      return response.status(403).json({
        message:
          "Access denied. Only the reviewer or an admin can perform this action.",
      });
    }

    await Review.findByIdAndDelete(reviewId);
    response
      .status(200)
      .json({ message: "Review successfully deleted", reviewId });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};
