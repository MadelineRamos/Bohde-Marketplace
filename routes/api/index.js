const router = require('express').Router();
const { UserController, PostController, CategoryController } = require('../../controllers');
const postRoutes = require('./Post-Routes');

const isAuthenticated = require('../../middleware/isAuthenticated');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', isAuthenticated, UserController.logout);
router.post('/post', PostController.post);
router.post('/findUser', UserController.findUser);
router.post('/findCategory', CategoryController.findCategory);

router.get('/categories', CategoryController.categories);
router.use('/posts', postRoutes);

module.exports = router;