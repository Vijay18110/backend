const { categoryController } = require('../../Controllers/ApiControllers/categoryController');
const { authMiddleware } = require('../../Middlewares/auth.Middleware');

const router = require('express').Router();


router.get('/getAllCategories', authMiddleware, categoryController);

exports.categoryRouter = router;