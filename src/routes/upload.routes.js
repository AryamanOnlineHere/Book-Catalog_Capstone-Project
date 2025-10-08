const express = require("express");
const router = express.Router();
const controller = require("../controllers/upload.controller");
const upload=require("../middlewares/uploadFile");
const { verifyToken, allowAuthorOrAdmin } = require("../middlewares/authJwt");

module.exports = (app) => {
  router.post("/books/:bookId/image", verifyToken,allowAuthorOrAdmin,upload,controller.uploadBookImage);
  router.get("/books/:bookId/image/:name", controller.downloadImage);
  router.delete("/books/:bookId/image/:name",controller.removeImage);
  router.get("/books/image",controller.getListFiles);
  app.use(router); 
};