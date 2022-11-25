const router = require('express').Router();

const {
  UserController,
  PostController,
  CategoryController
} = require('../../controllers');;

const isAuthenticated = require('../../middleware/isAuthenticated');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', isAuthenticated, UserController.logout);
router.post('/findUser', UserController.findUser);

router.post('/findCategory', CategoryController.findCategory);
router.get('/categories', CategoryController.categories);

router.post("/posts", PostController.createPost);
router.get("/posts/:post_id", PostController.getSinglePost);
router.put("/posts/:id", PostController.updatePost);
router.put("/posts/transactions/:post_id", PostController.createTransaction);

module.exports = router;