const { post } = require('../routes/api');
const User = require('./User');
const Item = require('./Item');
const Category = require('./Category');

// Item belongsTo Category
Item.belongsTo(Category, {
  foreignKey: 'category_id',
  });

// Categories have many Products
Category.hasMany(Item, {
  foreignKey: 'category_id',
});

 Item.belongsTo(post,
   {
     foreignKey: ('post_id'),
     onDelete: 'CASCADE'
   }
 )

module.exports = {
  User,
  Item,
  Category

};