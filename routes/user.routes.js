const express = require("express");
const router = express.Router();

const {verifyToken} = require("../middlewares/auth.middleware"); 
const { 
    addUserAddress, 
    getAllAddresses, 
    updateAddress, 
    getAddressById, 
    deleteAddress, 
    getShippingAddress,
    getAllShopCategory,
    getAllShops
} = require("../controllers/user.controller");


const { addressValidation, updateAddressValidation } = require("../middlewares/validation.middleware");


router.post('/address', [verifyToken, addressValidation], addUserAddress)
router.get('/address', verifyToken, getAllAddresses)
router.get('/address/:addressId', verifyToken, getAddressById)
router.put('/address/:addressId', [verifyToken, updateAddressValidation], updateAddress)
router.delete('/address/:addressId', verifyToken, deleteAddress)
router.get('/shippingAddresses', verifyToken, getShippingAddress)
router.get('/shopCategory', verifyToken, getAllShopCategory)
// router.get('/shopCategory/:categoryId', verifyToken, getAllShopCategory); // Assuming you want to get a specific category by ID
router.get('/shops', getAllShops);

module.exports = router
