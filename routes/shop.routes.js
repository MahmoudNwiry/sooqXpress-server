const router = require('express').Router();

const { shopLogin, shopProfile } = require('../controllers/auth.controller');
const { updateProfile, updateLogo } = require('../controllers/shop.controller');
const { verifyTokenShop } = require('../middlewares/auth.middleware');
const { updateShopProfileValidation, updateShopProfileLogoValidation } = require('../middlewares/validation.middleware');


router.post('/login', shopLogin); // check

router.get('/profile', verifyTokenShop, shopProfile); // check
router.put('/profile', [verifyTokenShop, updateShopProfileValidation], updateProfile); // check
router.put('/profile/logo', [verifyTokenShop, updateShopProfileLogoValidation], updateLogo); // check


module.exports = router;