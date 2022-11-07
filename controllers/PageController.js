module.exports = {
  getDashboard: (req, res) => {
    res.render(
      'dashboard',
      {
        welcomeMessage: `Welcome to the dashboard ${req.session.currentUser.firstName}!`,
        isAuthenticated: req.session.isAuthenticated
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