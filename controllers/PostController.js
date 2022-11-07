const router = require('express').Router();
const { Post } = require('../models');

module.exports = {
  post: async (req, res) => {
    const { body: { seller_id_FK, seller_balance, title, price, category, url, description } } = req;
    try {
        const post = await Post.create({
            seller_id_FK,
            seller_balance,
            title,
            price,
            category,
            url,
            description
        });
        res.status(200).json({ message: 'Item is now listed!' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}