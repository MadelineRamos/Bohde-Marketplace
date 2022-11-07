const sequelize = require('../db/config');
const { User, Category } = require('../models');

const userSeeds = require('./users.json');
const categorySeeds = require('./category-seeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userSeeds, {
    individualHooks: true,
    returning: true,
  });
  console.log('User Seeds Inserted');
  console.log('--------------');

  await Category.bulkCreate(categorySeeds, {
    individualHooks: true,
    returning: true,
  });
  console.log('Category Seeds Inserted');
  console.log('--------------');

  process.exit(0);
};

seedDatabase();