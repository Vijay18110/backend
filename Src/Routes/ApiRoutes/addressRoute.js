const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../../Middlewares/auth.Middleware");
const { getAddresses, addAddress, updateAddress, delateAddress } = require("../../Controllers/ApiControllers/address");
const decryptBody = require("../../Middlewares/decryptBody.middleware");

router.get("/getAddresses", authMiddleware, decryptBody, getAddresses);
router.post("/addAddress", authMiddleware, decryptBody, addAddress);
router.post("/updateAddress", authMiddleware, decryptBody, updateAddress);
router.post("/deleteAddress", authMiddleware, decryptBody, delateAddress);

exports.addressRoute = router;
