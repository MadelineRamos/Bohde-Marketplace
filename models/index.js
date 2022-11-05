const { post } = require('../routes/api');
const User = require('./User');
const Item = require('./Item');
const Category = require('./Category');
const Post = require('./Post');

Item.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

// Item.belongsTo(Post,
//   {
//     foreignKey: ('post_id'),
//     onDelete: 'CASCADE'
//   }
// )

module.exports = {
  User,
  Item,
  Category,
  Post,
};