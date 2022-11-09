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

    let userBalanceEl = document.querySelector('.user-balance').textContent.split('$')[
        document.querySelector('.user-balance').textContent.split('$').length - 1
    ];

    if (response.ok) {
        console.log('userbalance ***', userBalanceEl);
        // console.log('userBalanceAfterPurchase***', userBalanceAfterPurchase)
        // document.location.reload();
    } else {
        alert(response.statusText)
    }
};

document.querySelector('.buy-now-btn').addEventListener('click', buyNow);