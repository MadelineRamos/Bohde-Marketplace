const router = require('express').Router();
const sequelize = require('../config/connection');
const { Item, Price, Category, Image, Description, Condition, UserID } = require('../models')

// Get all listings for homepage
router.get('/', (req, res) => {

})

// Get single listing

module.exports = router;