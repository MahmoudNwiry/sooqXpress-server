const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/auth.middleware");
const { hasShopPermision, hasShopCategoryPermision, hasShopPermission } = require("../middlewares/permisions.middleware");
const { createShop, createShopCategory, getShopsCategory, getShopCategoryById, updateShopCategory, deleteShopCategory } = require("../controllers/admin.controller");
const { shopCategoryValidation, shopVaidation } = require("../middlewares/validation.middleware");


router.post('/shop', [verifyToken, hasShopPermission, shopVaidation], createShop) // check


router.get('/shop-category', [verifyToken], getShopsCategory) // check
router.get('/shop-category/:shcid', [verifyToken], getShopCategoryById) // check
router.post('/shop-category', [verifyToken, hasShopCategoryPermision, shopCategoryValidation], createShopCategory) // check
router.put('/shop-category/:shcid', [verifyToken, hasShopCategoryPermision, shopCategoryValidation], updateShopCategory) // check
router.delete('/shop-category/:shcid', [verifyToken, hasShopCategoryPermision], deleteShopCategory) // check // check when there is shop has the same category

module.exports = router;