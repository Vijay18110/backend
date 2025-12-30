const { getBanner } = require('../../Controllers/ApiControllers/Banner.controller');
const { authMiddleware } = require('../../Middlewares/auth.Middleware');
const decryptBody = require('../../Middlewares/decryptBody.middleware');

const router = require('express').Router();


router.get('/', decryptBody, getBanner);
exports.bannerRoute = router;