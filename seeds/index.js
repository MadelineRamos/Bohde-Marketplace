const sequelize = require('../db/config');
const { User, Category, Item, Post } = require('../models');

const userSeeds = require('./users.json');
const categorySeeds = require('./category-seeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userSeeds, {
    individualHooks: true,
    returning: true,
  });
  console.log('--------------');

  await Category.bulkCreate(categorySeeds, {
    individualHooks: true,
    returning: true,
  });
  console.log('--------------');

  process.exit(0);
};

seedDatabase();