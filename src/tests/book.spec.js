const Book = require("../models/book.model");
const bookController = require("../controllers/book.controller");

jest.mock("../models/book.model");

const mockRequest = (options = {}) => ({
  body: options.body || {},
  params: options.params || {},
  query: options.query || {},
  headers: options.headers || {},
  ...options,
});

const mockResponse = () => {
  const response = {};
  response.status = jest.fn().mockReturnValue(response);
  response.json = jest.fn().mockReturnValue(response);
  response.send = jest.fn().mockReturnValue(response);

  response.redirect=jest.fn();
  return response;
};
// 
describe("test/book", () => {
  let sampleBook;

  beforeEach(() => {
    sampleBook = {
      title: "New Book",
      author: "peter",
      description: "final description",
      publishedDate: new Date("12/06/2013"),
      createdBy: "23432324332",
      genre: "Action",
    };
    jest.clearAllMocks();
  });
  describe("GET /", () => {
    it("should get all books", async () => {
      Book.find.mockResolvedValue([sampleBook]);

      const request = mockRequest();
      const response = mockResponse();

      await bookController.getall(request, response);

      expect(Book.find).toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith([sampleBook]);
    });
     it("should return 500 if an error occurs", async () => {
      Book.find.mockRejectedValue(new Error("DB error"));

      const request = mockRequest()
      const response = mockResponse();

      await bookController.getall(request, response);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({ message: "DB error" });
    });
  });

  describe("POST /addBook", () => {
    it("should return 409 if book already exists", async () => {
      Book.findOne.mockResolvedValue(sampleBook);
      const request = mockRequest({ body: sampleBook });
      const response = mockResponse();

      await bookController.addBook(request, response);

      expect(response.status).toHaveBeenCalledWith(409);
      expect(response.json).toHaveBeenCalledWith({
        message: "Book with this title already exists",
      });
    });

    it("should return 201 if book is added successfully", async () => {
      Book.findOne.mockResolvedValue(null);
      Book.prototype.save = jest.fn().mockResolvedValue(sampleBook);
      const request = mockRequest({ body: sampleBook });
      const response = mockResponse();

      await bookController.addBook(request, response);

      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledWith(sampleBook);
    });

    it("should return 400 if an error occurs", async () => {
      Book.findOne.mockRejectedValue(new Error("DB error"));
      const request = mockRequest({ body: sampleBook });
      const response = mockResponse();

      await bookController.addBook(request, response);

      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({ message: "DB error" });
    });
  });
});
