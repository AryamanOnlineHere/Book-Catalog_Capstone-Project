const controller= require("../controllers/book.controller");
const path="/api/books";
module.exports=function(app){
    app.post(path,controller.add);
    app.get(path,controller.getall);
}