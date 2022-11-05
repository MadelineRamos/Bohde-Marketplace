const { post } = require('../routes/api');
const User = require('./User');
const Item = require('./Item')


Item.belongsTo(Post,
  {
    foreignKey: ('post_id'),
    onDelete: 'CASCADE'
  }
)

module.exports = {
  User,
};