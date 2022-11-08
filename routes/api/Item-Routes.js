const router = require('express').Router();
const { post } = require('.');
const sequelize = require('../../db/config');
const { Category, Post, User } = require('../../models')


// router.get all items
// Item has become Post
router.get('/api/posts', (req, res) => {
    Post.findall({
        attributes: ['post_id', 'seller_id', 'title', 'price', 'category_id', 'image_url', 'description'],
        include: [
            {
                model: Category,
                attributes: ['category_name']
            },
        ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
//router.get one item
router.get('/:post_id', (req, res) => {
    // find a single product by its `id`
    // be sure to include its associated Category and Tag data
    Post.findOne({
        where: {
            post_id: req.params.post_id
        },
        attributes: ['post_id', 'seller_id', 'title', 'price', 'category_id', 'image_url', 'description']
    })
        .then(dbProductData => {
            if (!dbProductData) {
                res.status(404).json({ message: 'No product found with this id' });
                return;
            }
            res.json(dbProductData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//new Post
router.post('/api/posts', (req, res) => {
    Post.create({
        user_id: req.body.user_id,
        seller_id: req.body.seller_id,
        title: req.body.title,
        price: req.body.price,
        category_id: req.body.category_id,
        image_url: req.body.image_url,
        description: req.body.description,
        include: [
            {
                model: User,
                attributes: ["lastName", 'firstName'],
            },
        ]
    })
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
});

//update item price 
router.put('/:id', (req, res) => {
    Post.update(
        {
            price: req.body.price
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No item found with this id' });
                return;
            }
            res.json(dbPostData);
        });
});

//buy an item
router.put('/:id', (req, res) => {
    // update seller's balance (sum)
    Post.update(
        {
            Balance: req.body.balance
        },
        {
            where: {
                price: req.price.id
            },
        }),
        //update buyer's balance (subtract)
        Post.update(
            {
                Balance: req.body.balance
            },
            {
                where: {
                    price: req.price.id
                },
            }),
        //delete post
        Post.destroy({
            where: {
                id: req.params.id
            },
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

// module.exports = router;