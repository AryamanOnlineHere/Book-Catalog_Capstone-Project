const express = require("express");
const router = express.Router();
const controller = require("../controllers/upload.controller");

module.exports = (app) => {
  router.post("/books/:bookId/image", controller.uploadBookImage);
//   router.get("/books/:bookId/image/:name", download);

  app.use(router); 
};
// 