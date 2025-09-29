const { response } = require("express");
const Book=require("../models/book.model");
const Review=require("../models/review.model");

//Book CRUD Operation
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
      new: true,            
      runValidators: true  
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



