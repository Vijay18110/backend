const { addToCart, getUserCart, removeItemFromCart, updateCartQuantity } = require('../../Controllers/ApiControllers/addToCart');
const { authMiddleware } = require('../../Middlewares/auth.Middleware');
const decryptBody = require('../../Middlewares/decryptBody.middleware');

const router = require('express').Router();

router.post('/addToCart', authMiddleware, decryptBody, addToCart);
router.get('/getCartData', authMiddleware, getUserCart);
router.post('/removeItemFromCart', authMiddleware, decryptBody, removeItemFromCart);
router.post('/updateCartQuantity', authMiddleware, decryptBody, updateCartQuantity);

exports.addToCartRoutes = router;