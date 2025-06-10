const express = require("express");
const router = express.Router();

const {verifyToken} = require("../middlewares/auth.middleware"); 
const { isOwner } = require("../middlewares/permisions.middleware");
const { createRole } = require("../controllers/owner.controller");

router.post('/roles', [verifyToken, isOwner], createRole)


module.exports = router
