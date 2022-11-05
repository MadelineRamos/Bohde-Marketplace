const router = require('express').Router();
const { UserController, ItemController, CategoryController } = require('../../controllers');

const isAuthenticated = require('../../middleware/isAuthenticated');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', isAuthenticated, UserController.logout);
router.post('/item', ItemController.item);

router.get('/categories', CategoryController.categories);

module.exports = router;