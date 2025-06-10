const express = require("express");
const router = express.Router();

const {verifyToken} = require("../middlewares/auth.middleware");
const { hasAddressPermision } = require("../middlewares/permisions.middleware");
const { addAddress } = require("../controllers/admin.controller");

router.post('/address', [verifyToken, hasAddressPermision], addAddress);

module.exports = router;