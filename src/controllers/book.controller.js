const Book=require("../models/book.model");

exports.add=async(request,response)=>{
      try {
        const book =new Book(request.body);
        const saveBook=await book.save();
        response.status(201).json(saveBook);
    } catch (error) {
        response.status(400).json({message:error.message})
    }

}

exports.getall=async(request,response)=>{
try {
    const books=await Book.find();
    response.status(200).json(books); 
} catch (error) {
    response.status(500).json({message: error.message});
}
}
