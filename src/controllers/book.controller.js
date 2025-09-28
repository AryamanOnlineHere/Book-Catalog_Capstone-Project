const { response } = require("express");
const Book=require("../models/book.model");
const Review=require("../models/review.model")


exports.addBook = async (request, response) => {
  try {
    const { title } = request.body;
    const existingBook = await Book.findOne({ title: title.trim() });

    if (existingBook) {
      return response.status(409).json({ message: "Book with this title already exists" });
    }

    const book = new Book(request.body);
    const savedBook = await book.save();

    response.status(201).json(savedBook);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};
exports.deleteBook=async(request,response)=>{
    try {
        const {bookId}=request.params;
        const  deleteBook=await Book.findByIdAndDelete(bookId);

        if(!deleteBook){
            response.status(404).json({message:"Book not found to delete"});
        }
        response.status(200).json({message:"Book sucessfully deleted",book:bookId});
    } catch (error) {
        response.status(500).json({message:error.message});
    }
};
exports.updateBookById = async (request, response) => {
  try {
    const { bookId } = request.params;
    const updateData = request.body;

    const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, {
      new: true,            // Return the updated document
      runValidators: true   // Run schema validations
    });

    if (!updatedBook) {
      return response.status(404).json({ message: "Book not found" });
    }

    response.status(200).json(updatedBook);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

exports.getall=async(request,response)=>{
try {
    const books=await Book.find();
    response.status(200).json(books); 
} catch (error) {
    response.status(500).json({message: error.message});
}
};

exports.addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const { bookId } = req.params;

        const review = new Review({
            book: bookId,
            rating,
            comment
        });
        const savedReview = await review.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllReview = async (request, response) => {
  try {
    const { bookId } = request.params;

    const reviews = await Review.find({ book: bookId });

    response.status(200).json(reviews);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};