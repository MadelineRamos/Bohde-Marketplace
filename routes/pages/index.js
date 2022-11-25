const router = require('express').Router();
const { PageController } = require('../../controllers');

const isAuthenticated = require('../../middleware/isAuthenticated');

// Static pages
router.get('/register', (req, res) => res.render('register'));
router.get('/login', (req, res) => res.render('login'));

// Pages with data
router.get('/', isAuthenticated, PageController.getDashboard);
router.get('/post/:id', isAuthenticated, PageController.getSinglePost);
router.get('/new-listing', isAuthenticated, PageController.newListing);

module.exports = router;