const router = require('express').Router();
const { post } = require('.');
const { Item, User, Category } = require('../../models')


// router.get all items
router.get('/', (req, res) => {
    Item.findall({
        attributes: ['id', 'title', 'price', 'category_id', 'discription', 'condition','user_id', 'image_url'],
        include: [
            {
              model: Category,
              attributes: ['category_name']
            },
        ]
    })
        .then(dbItemData => res.json(dbItemData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });
//router.get one item
router.get('/:id', (req, res) => {
    // find a single product by its `id`
    // be sure to include its associated Category and Tag data
    Item.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'title', 'price', 'category_id', 'discription', 'condition','user_id', 'image_url']
    })
      .then(dbProductData => {
        if (!dbProductData) {
          res.status(404).json({message: 'No product found with this id'});
          return;
        }
        res.json(dbProductData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// router.post item
router.post('/', (req, res) => {
    // create a new Item
    Item.create({
       title: req.body.title,
       price: req.body.price,
       category_id: req.body.category_id,  
       discription: req.body.discription, 
       condition: req.body.condition, 
       user_id: req.body.user_id, 
        image_url: req.body.image_url, 
   })
   .then((item) => {
       res.status(200).json(item);
   })
   .catch((err) => {
    console.log(err);
    res.status(400).json(err);
   })
});

//update item price 
router.put('/:id', (req, res) => {
    Item.update(
        {
        price: req.body.price
        },
        {
        where: {
            id: req.params.id
        }
    }
)
    .then(dbItemData => {
        if (!dbItemData) {
            res.status(404).json({ message: 'No item found with this id'});
            return;
        }
        res.json(dbItemData);
    });
});

//buy an item
router.put('/:id', (req, res) => {
    Item.update(
        {
            UserId: req.body.UserID
        },
        {
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No Post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;