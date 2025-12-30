const {
  addToCart,
  getUserCart,
  removeItemFromCart,
  updateCartQuantity,
} = require("../../Controllers/ApiControllers/addToCart");
const {
  addToWishList,
  getUserWishList,
  RemoveFromWishlist,
} = require("../../Controllers/ApiControllers/wishlist.controller");
const { authMiddleware } = require("../../Middlewares/auth.Middleware");
const decryptBody = require("../../Middlewares/decryptBody.middleware");

const router = require("express").Router();

router.post("/addToCart", authMiddleware, decryptBody, addToCart);
router.get("/getCartData", authMiddleware, getUserCart);
router.post(
  "/removeItemFromCart",
  authMiddleware,
  decryptBody,
  removeItemFromCart
);
router.post(
  "/updateCartQuantity",
  authMiddleware,
  decryptBody,
  updateCartQuantity
);
router.post("/addToWishList", authMiddleware, decryptBody, addToWishList);
router.get("/getUserWishList", authMiddleware, getUserWishList);
router.post(
  "/removeFromWishlist",
  authMiddleware,
  decryptBody,
  RemoveFromWishlist
);

exports.addToCartRoutes = router;
