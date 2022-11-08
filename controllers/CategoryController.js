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
  },

  findCategory: async (req, res) => {
    const { body: { category } } = req;
    try {
      const categoryItem = await Category.findOne({
        where: { category_name: category },
      });
      res.json(categoryItem);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}