const { Post, User } = require("../models");

module.exports = {
  getDashboard: async (req, res) => {
    const user = req.session.currentUser;
    console.log(user);
    const dbPosts = await Post.findAll({
      attributes: [
        'post_id',
        'seller_id',
        'title',
        'price',
        'category_id',
        'image_url',
        'description',
      ],
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName', 'balance']
        }
      ]
    });
    const posts = dbPosts.map(post => post.get({ plain: true }))
    res.render(
      'dashboard',
      {
        welcomeMessage: `Welcome to the dashboard ${req.session.currentUser.firstName}!`,
        isAuthenticated: req.session.isAuthenticated,
        posts,
        user
      }
    );
  },
  newListing: async (req, res) => {
    const user = req.session.currentUser;

    res.render(
      'new-post',
      {
        isAuthenticated: req.session.isAuthenticated,
        user
      }
    );
  }
}