const express = require("express");
const router = express.Router();
const cors = require("cors");
const dbConfig = require("./src/config/db.config");
require("dotenv").config();
const path=require("path")
const app = express();
app.use(express.json());

global.__basedir = __dirname;

const initRoutes = require("./src/routes/upload.routes");


const corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__basedir, "uploads")));

const db = require("./src/models/index");

db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch(err => {
  console.error(" Connection error:", err);
  process.exit();
});
require("./src/routes/book.routes")(app);
require("./src/routes/auth.routes")(app);
require("./src/routes/admin.routes")(app);
initRoutes(app);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

// Global error handler
app.use((err, request, response, next) => {
  console.error(err.stack);
  response.status(err.status || 500).json({ error: "Internal Server Error" });
});

