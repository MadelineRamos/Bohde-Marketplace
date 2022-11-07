const { post } = require('../routes/api');
const User = require('./User');
const Category = require('./Category');
const Post = require('./Post');

User.hasMany(Post, {
  foreignKey: 'user_id'
});

Category.hasMany(Post, {
  foreignKey: 'id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Post.belongsTo(Category, {
  foreignKey: 'id',
  onDelete: 'SET NULL'
});

module.exports = {
  User,
  Category,
  Post
};