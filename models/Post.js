const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/config');
const User = require('./User');

class Post extends Model {}

Post.init(
{
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    //from user
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "user",
            key: "id",
        }
    },
    balance: {
        type: DataTypes.INTEGER,
        references: {
            model: "user",
            key: "balance",
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: {
        model: "category",
        key: "id",
        },
    },
    image_url: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },

},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;
