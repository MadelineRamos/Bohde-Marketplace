async function buyNow(event) {
    event.preventDefault();

    let post_id = document.querySelector('.post-title').href.toString().split('/')[
        document.querySelector('.post-title').href.toString().split('/').length - 1
    ];

    // subtract price of item from user balance
    let price = document.querySelector('.price').textContent;

    const response = await fetch(`api/posts/transactions/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            post_id: post_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    async (req, res) => {
        try {
            res.json(req.session.currentUser);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    };

    if (response.ok) {
        document.location.reload();

    } else {
        alert(response.statusText)
    }
};

document.querySelector('.buy-now-btn').addEventListener('click', buyNow);