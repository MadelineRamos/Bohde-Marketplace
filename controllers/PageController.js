const { Post, User } = require("../models");

module.exports = {
  getDashboard: async (req, res) => {
    const user = req.session.currentUser;
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
    const posts = dbPosts.map(post => post.get({ plain: true }));
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

  getSinglePost: async (req, res) => {
    Post.findOne({
      where: {
        post_id: req.params.id
      },
      attributes: [
        'post_id',
        'seller_id',
        'title',
        'price',
        'image_url',
        'description',
        'category_id',
        'created_at'
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }

        const post = dbPostData.get({ plain: true });

        res.render('single-post', {
          post,
          isAuthenticated: req.session.isAuthenticated,
          currentUser: req.session.currentUser
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
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
};