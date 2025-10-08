const Book = require("../models/book.model");
const upload=require("../middlewares/uploadFile")

exports.uploadBookImage = async (request, response) => {
  upload(request, response, async (err) => {
    if (err) return response.status(500).json({ message: err.message });

    const bookId = request.params.bookId;
    const imageName = `${bookId}/${request.file.originalname}`;
    try {
      const updatedBook = await Book.findByIdAndUpdate(
        bookId,
        { image: imageName },
        { new: true }
      );

      if (!updatedBook) {
        return response.status(404).json({ message: "Book not found" });
      }

      response.status(200).json({
        message: "Image uploaded successfully",
        book: updatedBook
      });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  });
};

exports.downloadImage = (request, res) => {
  const bookId = request.params.bookId;
  const fileName = request.params.name;

  const filePath = path.join(__basedir, "uploads", bookId, fileName);

  res.download(filePath, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};
