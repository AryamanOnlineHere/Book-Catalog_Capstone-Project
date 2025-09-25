const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true,trim:true },
  author: String,
  genre: String,
  year: Number,
  description: String
});
bookSchema.pre("save", function (next) {
  if (this.title) {
    this.title = this.title.toLowerCase();
  }
  next();
});
bookSchema.index({ title: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
