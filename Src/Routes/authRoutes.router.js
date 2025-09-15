const express = require('express');
const router = express.Router();
const { login, logout } = require('../Controllers/authController.controller');
const { loginValildation } = require('../Middlewares/login.middleware');
const decryptBody = require('../Middlewares/decryptBody.middleware');
router.post('/login', decryptBody, loginValildation, login);
router.post('/logout', decryptBody, logout);
exports.loginRouter = router;