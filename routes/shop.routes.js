const router = require('express').Router();

const { shopLogin, shopProfile } = require('../controllers/auth.controller');
const { verifyTokenShop } = require('../middlewares/auth.middleware');


router.post('/login', shopLogin); // check

router.get('/profile', verifyTokenShop, shopProfile); // develop


module.exports = router;