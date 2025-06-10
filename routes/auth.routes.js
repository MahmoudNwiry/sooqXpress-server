const express = require("express");
const router = express.Router();

// const {  regsiterValidation, loginValidation} = require("../middlewares/authvalidation.middleware")
const { login, register, userProfile, users} = require("../controllers/auth.controller")
const {verifyToken} = require("../middlewares/auth.middleware") 

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, userProfile);
router.get("/users", verifyToken, users);

module.exports = router;