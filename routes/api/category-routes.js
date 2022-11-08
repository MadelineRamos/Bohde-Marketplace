const router = require('express').Router();
const { Category, Item } = require('../../models');
// find one category
router.get('/api/category/:id', (req, res) => {
// router.get('/:category_name', (req, res) => {
    Category.findOne({
        where: {
            // category_name: req.params.category_name
            id: req.params.id
        },
        // include its associated Items
        include: [
            {
                model: Item,
                attributes: ['post_id','seller_id', 'title', 'price', 'category_id', 'image_url', 'description']
            }
        ]

    })
        .then(dbCategoryData => {
        if (!dbCategoryData) {
          res.status(404).json({message: 'No product found with this id'});
          return;
        }
        res.json(dbCategoryData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;