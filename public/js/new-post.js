const newItemHandler = async (event) => {
    event.preventDefault();

    const postTitle = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#content').value.trim();
    const url = document.querySelector('#url').value.trim();
    const price = document.querySelector('#price').value.trim();
    const category = document.querySelector('#dropdownMenuButton').value.trim();

// need to get category_id and user_id before sending below data

    if (postTitle && content && url && price && category) {
      const response = await fetch('/api/item', {
        method: 'POST',
        body: JSON.stringify({ postTitle, content, url, price, category }),
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

const categoryLoad = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/categories', {
        method: 'GET',
        body: JSON.stringify({ category_name }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        const dropDownMenu = document.querySelector('#dropdownMenuCategories');
        for (var category in response.categories) {
            let dropDownItem = document.createElement('button');
            dropDownItem.class = "dropdown-item";
            dropDownItem.type = "button";
            dropDownItem.innerHTML = category;
            dropDownMenu.appendChild(dropDownItem);
        }
    } else {
        alert(response.statusText);
    }
}

const updateDropdown = e => {
    document.querySelector('#dropdownMenuButton').innerHTML = e.target.value;
}

document
    .onload(categoryLoad);

document
    .querySelector('.new-post-form-form')
    .addEventListener('submit', newItemHandler);

document
    .querySelector('.dropDownItem')
    .addEventListener('click', updateDropdown);
