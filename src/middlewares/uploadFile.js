const multer = require("multer");
const maxSize = 20 * 1024 * 1024;
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    const bookId = request.params.bookId;
    const uploadPath = path.join(__basedir, "uploads", bookId);

    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (request, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("myfile");

module.exports = uploadFile;
