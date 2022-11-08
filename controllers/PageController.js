const { Post } = require("../models");

module.exports = {
  getDashboard: async (req, res) => {
    const dbPosts = await Post.findAll();
    const posts = dbPosts.map(post => post.get({ plain: true }))
    res.render(
      'dashboard',
      {
        welcomeMessage: `Welcome to the dashboard ${req.session.currentUser.firstName}!`,
        isAuthenticated: req.session.isAuthenticated,
        posts
      }
    );
  },
  newListing: (req, res) => {
    res.render(
      'new-post',
      {
        isAuthenticated: req.session.isAuthenticated
      }
    );
  }
}