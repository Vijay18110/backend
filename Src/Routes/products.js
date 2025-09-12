const express = require('express');
const { getAllProducts, getProductById } = require('../Controllers/Products.controller');
const { authMiddleware } = require('../Middlewares/auth.Middleware');
const router = express.Router();
// Route to get all products
router.get('/getAllProducts', authMiddleware, getAllProducts);
router.get('/getProductById/:id', authMiddleware, getProductById);
exports.productRoutes = router;