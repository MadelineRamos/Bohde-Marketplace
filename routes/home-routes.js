const router = require('express').Router();
const sequelize = require('../config/connection');
const { Item } = require('../models');
const Post = require('../models/Post');

// Get all listings for homepage
router.get('/', (req, res) => {

})

// Get single listing
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'price',
            'category_id',
            'created_at'
        ],
        include: [
            {
                model: Item,
                attributes: ['id', 'title', 'category_id', 'description', 'condition', 'user_id', 'image_url']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            const post = dbPostData.get({ plain: true });

            res.render('single-post', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;