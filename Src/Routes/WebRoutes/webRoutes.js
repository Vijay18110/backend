const homeController = require('../../Controllers/webControllers/homeController');
const { login } = require('../../Controllers/webControllers/loginController');

const router = require('express').Router();

router.get("/", homeController);
router.get("/login", login);
exports.webRoutes = router; 