const express = require("express");

const {
  getAllProducts,
  getProductById,
} = require("../../Controllers/ApiControllers/Products.controller");
const { authMiddleware } = require("../../Middlewares/auth.Middleware");
const decryptBody = require("../../Middlewares/decryptBody.middleware");
const router = express.Router();
// Route to get all products
router.get("/getAllProducts", decryptBody, getAllProducts);
router.get("/getProductById/:id", decryptBody, getProductById);
exports.productRoutes = router;
