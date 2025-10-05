const Admin = require("../models/admin.model");
const Author = require("../models/author.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const {isPasswordValid}=require("../validation-rules/passwordValidator")

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

exports.signup = async (request, response) => {
  try {
    const { username, password, email, role } = request.body;
        console.log("Password received:", password);
console.log("Is valid:", isPasswordValid(password));

    if (!isPasswordValid(password)) {
      return response.status(400).json({
        error:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character and no whitespaces",
      });
    }
    if (role === "admin") {
      const admin = new Admin({ username, password, email, role });
      await admin.save();
      return response
        .status(201)
        .json({ message: "Admin registered successfully" });
    } else if (role === "author") {
      const author = new Author({ username, password, email, role });
      await author.save();
      return response
        .status(201)
        .json({ message: "Author registered successfully" });
    } else {
      return response
        .status(400)
        .json({ error: 'Invalid role. Use "admin" or "author".' });
    }
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
};

exports.signin = async (request, response) => {
  try {
    const { email, password } = request.body;

    let user = await Admin.findOne({ email });
    let role = "admin";

    if (!user) {
      user = await Author.findOne({ email });
      role = "author";
    }

    if (!user)
      return response.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return response.status(400).json({ error: "Invalid credentials" });

    const token = generateToken(user);

    response.json({ token, role });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};
