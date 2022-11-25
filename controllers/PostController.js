const { Item, Post, User } = require('../models');

module.exports = {
  getSinglePost: (req, res) => {
    Post.findOne({
      where: { post_id: req.params.post_id },
      attributes: [
        'post_id',
        'seller_id',
        'title',
        'price',
        'category_id',
        'image_url',
        'description'
      ],
    })
      .then(dbProductData => {
        if (!dbProductData) {
          res.status(404).json({ message: 'No product found with this id' });
          return;
        }
        res.json(dbProductData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  createPost: (req, res) => {
    const {
      body: {
        seller_id,
        title,
        price,
        category_id,
        image_url,
        description
      },
    } = req;
    Post.create({
      seller_id,
      title,
      price,
      category_id,
      image_url,
      description,
      include: [
        {
          model: User,
          attributes: ['lastName', 'firstName'],
        },
      ],
    })
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  updatePost: (req, res) => {
    Item.update(
      {
        price: req.body.price,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then(dbItemData => {
      if (!dbItemData) {
        res.status(404).json({ message: 'No item found with this id' });
        return;
      }
      res.json(dbItemData);
    });
  },

  createTransaction: async (req, res) => {
    try {
      const postData = await Post.findOne({
        where: { post_id: req.params.post_id },
      });

      const { price, seller_id } = postData.dataValues;

      const buyerUserData = req.session.currentUser;
      const userBalanceAfterPurchase = buyerUserData.balance - price;

      if (userBalanceAfterPurchase < 0) {
        console.log("Insufficient Funds Error");
        res.status(422).json({ message: "Unfortunately you have insufficient funds to complete this purchase" });
        return;
      }

      await User.update(
        { balance: userBalanceAfterPurchase },
        { where: { id: buyerUserData.id } }
      );

      const sellerUserData = await User.findOne({
        where: { id: seller_id },
      });

      const newBalance = sellerUserData.dataValues.balance + price;

      await User.update(
        { balance: newBalance },
        { where: { id: seller_id } }
      );

      await Post.destroy({
        where: { post_id: req.params.post_id },
      });

     res.json({ message: 'Transaction successful', userBalanceAfterPurchase });

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};
