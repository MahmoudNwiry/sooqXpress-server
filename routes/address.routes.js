const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/auth.middleware");
const { hasAddressPermission } = require("../middlewares/permisions.middleware");
const { addAddress } = require("../controllers/admin.controller");
const { mainAddressVaidation } = require("../middlewares/validation.middleware");

router.post('/address', [verifyToken, hasAddressPermission, mainAddressVaidation], addAddress);

module.exports = router;