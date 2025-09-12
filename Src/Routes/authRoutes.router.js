const express = require('express');
const router = express.Router();
const { login, logout } = require('../Controllers/authController.controller');
const { loginValildation } = require('../Middlewares/login.middleware');
router.post('/login', loginValildation, login);
router.post('/logout', logout);
exports.loginRouter = router;