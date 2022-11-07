const router = require('express').Router();
const { Post } = require('../models');

module.exports = {
  post: async (req, res) => {
    const { body: { seller_id_FK, seller_balance_FK, postTitle, price, category, url, description } } = req;
    try {
        const post = await Post.create({
            seller_id,
            balance,
            postTitle,
            price,
            category,
            url,
            description
        });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}