const express = require("express");
const cors=require("cors");
const dbConfig=require ("./src/config/db.config")
const Book=require("./src/models/book.model");

const app =express();

var corsOptions={
    origin:"http://localhost:8081"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const db=require("./src/models/index");
// const Book=db.books

db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true

})
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch(err=>{
    console.error("connection error",err);
    process.exit();
});
require("./src/routes/book.routes")(app);

const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`server is running on PORT no : ${PORT}`);
});
// Global error handler
app.use((err,request,response,next)=>{
    console.log(err.stack);
    response.status(err.status||500).json({error:'Internal Server Error'});

});