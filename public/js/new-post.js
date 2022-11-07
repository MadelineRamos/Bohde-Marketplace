const newItemHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#item').value.trim();
    const description = document.querySelector('#description').value.trim();
    const url = document.querySelector('#image').value.trim();
    const price = document.querySelector('#price').value.trim();
    const category = document.querySelector('#category').value.trim();

    // get category fk
    let categoryFK = null;
    await fetch('api/findCategory', {
        method: 'POST',
        body: JSON.stringify({ category }),
        headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        categoryFK = data.id;
    });

    // get user id and balance fk
    let seller_id_FK = null;
    let seller_balance_FK = null;
    await fetch('api/findUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        seller_id_FK = data.id;
        seller_balance = data.balance;
    });

    // create new post
    if (seller_id_FK && seller_balance && title && price && category && url && description) {
        const response = await fetch('api/post', {
        method: 'POST',
        body: JSON.stringify({ seller_id_FK, seller_balance, title, price, category, url, description }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        const { message } = await response.json();
        showToast({ message });
      }
    }
};

const categoryLoad = async () => {
    await fetch('api/categories')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let categories = data;
        const dropDownMenu = document.querySelector('#category');
        for (let i = 0; i < categories.length; i++) {
            let dropDownItem = document.createElement('option');
            dropDownItem.innerHTML = categories[i].category_name;
            dropDownMenu.appendChild(dropDownItem);
        }
    });
}

window.onload = categoryLoad();

document
    .querySelector('form')
    .addEventListener('submit', newItemHandler);
