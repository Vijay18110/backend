const express = require('express');
const { getAllProducts, getProductById } = require('../Controllers/Products.controller');
const { authMiddleware } = require('../Middlewares/auth.Middleware');
const decryptBody = require('../Middlewares/decryptBody.middleware');
const router = express.Router();
// Route to get all products
router.get('/getAllProducts', decryptBody, authMiddleware, getAllProducts);
router.get('/getProductById/:id', decryptBody, authMiddleware, getProductById);
exports.productRoutes = router;