const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/auth.middleware");
const { 
    hasShopCategoryPermision, 
    hasShopPermission, 
    hasProductCategoryPermission 
} = require("../middlewares/permisions.middleware");
const { 
    createShop, 
    createShopCategory, 
    getShopsCategory, 
    getShopCategoryById, 
    updateShopCategory, 
    deleteShopCategory, 
    getAllShops, 
    getShopById, 
    createProductCategory, 
    updateProductCategory, 
    deleteProductCategory, 
    getAllProductCategories, 
    getProductCategoryById, 
    createProductSubCategory,
    updateProductSubCategory,
    getAllProductSubCategories,
    getProductSubCategoryById,
    deleteProductSubCategory
} = require("../controllers/admin.controller");
const { 
    shopCategoryValidation, 
    shopVaidation, 
    createProductCategoryValidation, 
    createProductSubCategoryValidation, 
    updateProductCategoryValidation,
    updateProductSubCategoryValidation
} = require("../middlewares/validation.middleware");


// Admin routes for managing shops
router.post('/shop', [verifyToken, hasShopPermission, shopVaidation], createShop) // check
router.get('/shop', [verifyToken, hasShopPermission], getAllShops) // check
router.get('/shop/:shopId', [verifyToken, hasShopPermission], getShopById) // check

// Admin routes for managing shop categories
router.get('/shop-category', [verifyToken], getShopsCategory) // check
router.get('/shop-category/:shcid', [verifyToken], getShopCategoryById) // check
router.post('/shop-category', [verifyToken, hasShopCategoryPermision, shopCategoryValidation], createShopCategory) // check
router.put('/shop-category/:shcid', [verifyToken, hasShopCategoryPermision, shopCategoryValidation], updateShopCategory) // check
router.delete('/shop-category/:shcid', [verifyToken, hasShopCategoryPermision], deleteShopCategory) // 1- check // 2- check when there is shop has the same category

// Admin routes for managing product categories and subcategories
router.get('/category', [verifyToken], getAllProductCategories); // check
router.get('/category/:cid', [verifyToken], getProductCategoryById); // check
router.post('/category', [verifyToken, hasProductCategoryPermission, createProductCategoryValidation], createProductCategory); // check
router.put('/category/:cid', [verifyToken, hasProductCategoryPermission, updateProductCategoryValidation], updateProductCategory); // check
router.delete('/category/:cid', [verifyToken, hasProductCategoryPermission], deleteProductCategory); // check
router.get('/sub-category', [verifyToken], getAllProductSubCategories); // development placeholder
router.get('/sub-category/:scid', [verifyToken], getProductSubCategoryById); // development placeholder
router.post('/sub-category', [verifyToken, hasProductCategoryPermission, createProductSubCategoryValidation], createProductSubCategory); // development placeholder
router.put('/sub-category/:scid', [verifyToken, hasProductCategoryPermission, updateProductSubCategoryValidation], updateProductSubCategory); // development placeholder
router.delete('/sub-category/:scid', [verifyToken, hasProductCategoryPermission], deleteProductSubCategory); // development placeholder



module.exports = router;