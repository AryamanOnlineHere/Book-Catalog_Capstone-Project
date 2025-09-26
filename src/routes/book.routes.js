const controller= require("../controllers/book.controller");
const {title,published,genre,author,description}= require('../validation-rules/bookValidationRules');
const path="/api/books";
const validate=validations=>{
    return async(request,response,next)=>{
        for(const validation of validations){
            const result =await validation.run(request);
            if(!result.isEmpty()){
                return response.status(400).json({errors: result.array()});
            }
        }
        next();
    };
};

module.exports=function(app){
    app.post(path,validate([title,published,genre,author,description]),controller.add);
}

