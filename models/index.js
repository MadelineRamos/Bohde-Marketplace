// const { post } = require('../routes/api');
const User = require('./User');
const Category = require('./Category');
const Post = require('./Post');

User.hasMany(Post, {
  foreignKey: 'seller_id'
});

Category.hasMany(Post, {
  foreignKey: 'category_id'
});

Post.belongsTo(User, {
  foreignKey: 'seller_id',
  onDelete: 'SET NULL'
});

Post.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'SET NULL'
});

module.exports = {
  User,
  Post,
  Category
};