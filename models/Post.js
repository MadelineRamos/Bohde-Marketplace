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
    //from item
    price: {
        type: DataTypes.INTEGER,
        references: {
            model: "item",
            key: "price",
        },
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
        references: {
            model: "item",
            key: "image_url",
        },
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
