const express = require("express");
const router = express.Router();
const controller = require("../controllers/upload.controller");
const upload=require("../middlewares/uploadFile");
const { verifyToken,isAuthorOrAdmin } = require("../middlewares/authJwt");

module.exports = (app) => {
  router.post("/books/:bookId/image", verifyToken,isAuthorOrAdmin,upload,controller.uploadBookImage);
  router.get("/books/:bookId/image/:name", controller.downloadImage);
  router.delete("/books/:bookId/image/:name", verifyToken,isAuthorOrAdmin,controller.removeImage);
  router.get("/books/image", verifyToken,controller.getListFiles);
  app.use(router); 
};