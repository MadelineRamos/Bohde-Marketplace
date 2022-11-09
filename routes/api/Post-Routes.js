const router = require("express").Router();
const sequelize = require("../../db/config");
const { Category, Post, User } = require("../../models");

// router.get all items
// Item has become Post
router.get("/api/posts", (req, res) => {
    Post.findAll({
        attributes: [
            "post_id",
            "seller_id",
            "title",
            "price",
            "category_id",
            "image_url",
            "description",
            "created_at"
        ],
        include: [
            {
                model: Category,
                attributes: ["category_name"],
            },
        ],
    })
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
//router.get one item
router.get("/:post_id", (req, res) => {
    // find a single product by its `id`
    // be sure to include its associated Category and Tag data
    Post.findOne({
        where: {
            post_id: req.params.post_id,
        },
        attributes: [
            "post_id",
            "seller_id",
            "title",
            "price",
            "category_id",
            "image_url",
            "description",
        ],
    })
        .then((dbProductData) => {
            if (!dbProductData) {
                res.status(404).json({ message: "No product found with this id" });
                return;
            }
            res.json(dbProductData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//new Post
router.post("/api/posts", (req, res) => {
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
                attributes: ["lastName", "firstName"],
            },
        ],
    })
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

//update item price
router.put("/:id", (req, res) => {
    Item.update(
        {
            price: req.body.price,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    ).then((dbItemData) => {
        if (!dbItemData) {
            res.status(404).json({ message: "No item found with this id" });
            return;
        }
        res.json(dbItemData);
    });
});

//buy an item
router.put("/transactions/:post_id", async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                post_id: req.params.post_id,
            },
        });

        const { price, seller_id } = postData.dataValues;

        const buyerUserData = req.session.currentUser;

        const userBalanceAfterPurchase = buyerUserData.balance - price;

        if (userBalanceAfterPurchase < 0) {
            console.log("err");
            res.json(400).json({ message: "insufficient funds" });
        }

        const buyerUpdateData = await User.update(
            {
                balance: userBalanceAfterPurchase,
            },
            {
                where: {
                    id: buyerUserData.id,
                },
            }
        );

        const sellerUserData = await User.findOne({
            where: {
                id: seller_id,
            },
        });

        const newBalance = sellerUserData.dataValues.balance + price;

        const sellerUpdateData = await User.update(
            {
                balance: newBalance,
            },
            {
                where: {
                    id: seller_id,
                },
            }
        );

        const destroyPost = await Post.destroy({
            where: {
                post_id: req.params.post_id,
            },
        });

        res.json({ message: "transaction complete" });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
