const router = require('express').Router();
const { Item } = require('../models');

module.exports = {
    item: async (req, res) => {
        const { body: { postTitle, content, url, price, category } } = req;
        try {
            const item = await Item.create({
                postTitle,
                price,
                category,
                content,
                userID,
                url
              });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
    }
}