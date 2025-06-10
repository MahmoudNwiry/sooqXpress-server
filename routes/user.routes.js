const express = require("express");
const router = express.Router();

const {verifyToken} = require("../middlewares/auth.middleware"); 
const { 
    addUserAddress, 
    getAllAddresses, 
    updateAddress, 
    getAddressById, 
    deleteAddress, 
    getShippingAddress
} = require("../controllers/user.controller");


router.post('/address', verifyToken, addUserAddress)
router.get('/address', verifyToken, getAllAddresses)
router.get('/address/:addressId', verifyToken, getAddressById)
router.put('/address/:addressId', verifyToken, updateAddress)
router.delete('/address/:addressId', verifyToken, deleteAddress)
router.get('/shippingAddresses', verifyToken, getShippingAddress)

module.exports = router
