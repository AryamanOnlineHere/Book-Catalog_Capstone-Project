const controller= require("../controllers/book.controller");
module.exports=function(app){
    app.post("/api/books",controller.add);
    
}