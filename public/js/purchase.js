async function buyNow(event) {
  event.preventDefault();

  const post_id = event.target.dataset.id;
  const response = await fetch(`api/posts/transactions/${post_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ post_id }),
  });
  const formattedResponse = await response.json();

  if (response.ok) {
    showToast({ message: formattedResponse.message });
    document.querySelector('.user-balance').textContent = `Your Balance: $${formattedResponse.userBalanceAfterPurchase}`;
  } else {
    showToast({ message: formattedResponse.message });
  }
}

document.querySelectorAll('.buy-now-btn').forEach(button => button.addEventListener('click', buyNow));
