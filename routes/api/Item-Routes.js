const router = require('express').Router();
const { Post } = require('.');
const sequelize = require('../../db/config');
const { Category, Post, User } = require('../../models')


// router.get all items

//router.get one item

//router.post item

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
                res.status(404).json({ message: 'No item found with this id' });
                return;
            }
            res.json(dbItemData);
        });
});

//buy an item
router.put('/:id', (req, res) => {

    Post.destroy({
        where: {
            id: req.params.id
        },
    }),
        User.update(
            {
                Balance: req.body.balance
            },
            {
                where: {
                    balance: req.params.id
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

module.exports = router;