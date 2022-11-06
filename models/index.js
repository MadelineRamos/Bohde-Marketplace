const { post } = require('../routes/api');
const User = require('./User');
const Item= require('./Item');
const Post = require('./Post');
const Category = require('./Category');

// Item belongsTo Category
Item.belongsTo(Category, {
  foreignKey: 'category_id',
  });

// Categories have many Items
Category.hasMany(Item, {
  foreignKey: 'category_id',
});

Item.belongsTo(Post,
  {
    foreignKey: ('post_id'),
    onDelete: 'CASCADE'
  }
)


module.exports = {
  User,
  Item,
  Post,
  Category
};