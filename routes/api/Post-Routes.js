const router = require('express').Router();
const sequelize = require('../../db/config');
const { Category, Post, User } = require('../../models')


// router.get all items

//router.get one item

//router.post item

//update item price
// /api/posts/12312
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
router.put('/transactions/:post_id', async (req, res) => {

    try {
        const postData = await Post.findOne({
            where: {
                post_id: req.params.post_id
            }
        });

        const { price, seller_id } = postData.dataValues;

        const buyerUserData = req.session.currentUser;

        const userBalanceAfterPurchase = buyerUserData.balance - price;

        if (userBalanceAfterPurchase < 0 ) {
            console.log('err');
            res.json(400).json({ message: 'insufficient funds'});
        };

        const buyerUpdateData = await User.update({
            balance: userBalanceAfterPurchase
        },
        {
            where: {
                id: buyerUserData.id
            },
        });

        const sellerUserData = await User.findOne({
            where: {
                id: seller_id
            }
        });

        const newBalance = sellerUserData.dataValues.balance + price;

        const sellerUpdateData = await User.update({
            balance: newBalance
        },{
            where: {
                id: seller_id
            }
        });

        const destroyPost = await Post.destroy({
            where: {
                post_id: req.params.post_id
            }
        });


        res.json({ message: 'transaction complete' })


    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;