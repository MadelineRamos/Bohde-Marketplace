const router = require('express').Router();
const { Category } = require('../models');

module.exports = {
categories: async (req, res) => {
    try {
      const category = await Category.findAll({
        attributes: [ 'category_name' ]
      });
      if (!category) {
        res.status(404).json({ message: 'No categories found' });
        return;
      }
      res.json(category);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}