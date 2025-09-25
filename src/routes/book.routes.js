const controller= require("../controllers/book.controller");
const {body,validationResult}= require('express-validator');
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
    app.post(path,validate([body('title').notEmpty().withMessage('Title is required').isLength({max:10}).withMessage('Title connot exceed 10 charecter')]),controller.add);
    app.get(path,controller.getall);
}

// const controller = require("../controllers/book.controller");
// const { body, validationResult } = require('express-validator');
// const path = "/api/books";

// const validate = (validations) => {
//     return async (request, response, next) => {
//         for (const validation of validations) {
//             const result = await validation.run(request);
//             if (!result.isEmpty()) {
//                 return response.status(400).json({ errors: result.array() });
//             }
//         }
//         next();
//     };
// };

// module.exports = function(app) {
//     app.post(
//         path,
//         validate([
//             body('title')
//                 .notEmpty().withMessage('Title is required')
//                 .isLength({ max: 10 }).withMessage('Title cannot exceed 10 characters')
//         ]),
//         controller.add
//     );

//     app.get(path, controller.getall);
// };
