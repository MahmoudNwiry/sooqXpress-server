const express = require("express");
const router = express.Router();

// const {  regsiterValidation, loginValidation} = require("../middlewares/authvalidation.middleware")
const { login, register, userProfile, users} = require("../controllers/auth.controller")
const {verifyToken} = require("../middlewares/auth.middleware"); 
const { signUpValidation } = require("../middlewares/validation.middleware");

router.post("/register",signUpValidation , register);
router.post("/login", login);
router.get("/profile", verifyToken, userProfile);

module.exports = router;