const { post } = require('../routes/api');
const User = require('./User');


Item.belongsTo(Post,
  {
    foreignKey: ('post_id'),
    onDelete: 'CASCADE'
  }
)

module.exports = {
  User
};