const newItemHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#item').value.trim();
    const description = document.querySelector('#description').value.trim();
    const image_url = document.querySelector('#image').value.trim();
    const price = document.querySelector('#price').value.trim();
    const category = document.querySelector('#category').value.trim();

    // get category fk
    let category_id = null;
    await fetch('api/findCategory', {
        method: 'POST',
        body: JSON.stringify({ category }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            category_id = data.id;
        });

    // get user id and balance fk
    let seller_id = null;
    await fetch('api/findUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            seller_id = data.id;
        });

    // create new post
    if (seller_id && title && price && category_id && image_url && description) {
        const response = await fetch('api/post', {
            method: 'POST',
            body: JSON.stringify({ seller_id, title, price, category_id, image_url, description }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            const { message } = await response.json();
            showToast({ message: 'Problem listing item.' });
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
