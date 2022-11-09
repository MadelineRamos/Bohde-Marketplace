async function buyNow(event) {
    event.preventDefault();

    let post_id = document.querySelector('.card-title').href.toString().split('/')[
        document.querySelector('.card-title').href.toString().split('/').length - 1
    ];

    const response = await fetch(`api/posts/transactions/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            post_id: post_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // trying to get updated user balance
    await fetch('api/findUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log('data', data);
        });

    if (response.ok) {
        // console.log('userBalanceAfterPurchase***', userBalanceAfterPurchase)
        document.querySelector('.user-balance').textContent = `Your Balance: ${userBalanceAfterPurchase}`;
        document.location.reload();
    } else {
        alert(response.statusText)
    }
};

document.querySelector('.buy-now-btn').addEventListener('click', buyNow);