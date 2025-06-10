// const validator = require("../utils/validate")
// const regsiterValidation = async (req, res, next) => {
//     const validateRule = {
//         "firstName": "required|string|min:2", 
//         "lastName": "required|string|min:2", 
//         "password":"required|min:6",
//         "phoneNumber":"required|max:10|min:10"
//     }

//     await validator(req.body, validateRule, {}, (err, status) =>{
//         if (!status){
//             res.status(412)
//             .send({
//                 success: false,
//                     message: 'Validation failed',
//                     data: err
//             })
        
//         } else {
//             next();
//         }
//     }).catch(err => console.log(err))
// }

// const loginValidation = async (req, res, next) => {
//     const validateRule = {
//         "phoneNumber": "required|string|min:10|max:10", 
//         "password":"required|min:6",
//     }

//     await validator(req.body, validateRule, {}, (err, status) =>{
//         if (!status){
//             res.status(412)
//             .send({
//                 success: false,
//                     message: 'Validation failed',
//                     data: err
//             })
        
//         } else {
//             next();
//         }
//     }).catch(err => console.log(err))
// }

// module.exports = {
//     regsiterValidation, 
//     loginValidation
// }