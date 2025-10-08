const Book = require("../models/book.model");
const path = require("path");
const fs = require("fs");

exports.uploadBookImage = async (request, response) => {
  const bookId = request.params.bookId;

  if (!request.file) {
    return response.status(400).json({ message: "No file uploaded." });
  }

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
      book: updatedBook,
    });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
exports.getListFiles = (request, response) => {
  const filePath = path.join(__basedir, "uploads");
  const baseUrl = `${request.protocol}://${request.get("host")}/uploads/`;

  fs.readdir(filePath, function (err, files) {
    if (err) {
      response.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    response.status(200).send(fileInfos);
  });
};

exports.downloadImage = (request, response) => {
  const bookId = request.params.bookId;
  const fileName = request.params.name;

  const filePath = path.join(__basedir, "uploads", bookId, fileName);

  response.download(filePath, fileName, (err) => {
    if (err) {
      response.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

exports.removeImage = (request, response) => {
  const bookId= request.params.bookId;
  const fileName = request.params.name;
  const filePath = path.join(__basedir, "uploads",bookId, fileName);
  
  fs.unlink(filePath, (err) => {
    if (err) {
      response.status(500).send({
        message: "COuld not delete file" + err,
      });
    }
    response.status(200).send({ message: "file scucessfully deleted" });
  });
};
