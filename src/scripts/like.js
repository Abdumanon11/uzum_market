const productsContainer = document.getElementById("produsts");
const likeBox = document.getElementById("like-box"); // пустая заглушка

function renderLiked() {
  const likedItems = JSON.parse(localStorage.getItem('liked')) || [];

  productsContainer.innerHTML = ''; // очищаем
  if (likedItems.length === 0) {
    likeBox.style.display = 'block'; // показать заглушку
    productsContainer.style.display = 'none';
  } else {
    likeBox.style.display = 'none';  // скрыть заглушку
    productsContainer.style.display = 'flex';
    createProductCard(likedItems);
  }
}

function createProductCard(goods) {
  for (let item of goods) {
    const formattedPrice = Number(item.price).toLocaleString("ru-RU");

    const product = document.createElement('div');
    product.className = 'product';
    product.dataset.id = item.id;

    const imgBox = document.createElement('div');
    imgBox.className = 'img_box';

    const img = document.createElement('img');
    img.src = item.media;
    img.className = 'img_pr';

    const favoriteBtn = document.createElement('button');
    favoriteBtn.className = 'favorite-btn';

    const icon = document.createElement('img');
    icon.src = '/public/Vector2.png';
    favoriteBtn.appendChild(icon);

    favoriteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      removeFromLike(item.id);
    });

    imgBox.append(img, favoriteBtn);

    const text = document.createElement('div');
    text.className = 'text';

    const title = document.createElement('p');
    title.className = 'tide';
    title.textContent = item.title;

    const price = document.createElement('p');
    price.className = 'skd';
    price.textContent = `${formattedPrice} сум`;

    text.append(title, price);
    product.append(imgBox, text);

    product.addEventListener('click', () => {
      sessionStorage.setItem('currentProductId', item.id);
      window.location.href = '/produkt';
    });

    productsContainer.appendChild(product);
  }
}

function removeFromLike(id) {
  let liked = JSON.parse(localStorage.getItem('liked')) || [];
  liked = liked.filter(el => el.id !== id);
  localStorage.setItem('liked', JSON.stringify(liked));
  renderLiked(); // обновить UI
}

renderLiked();
