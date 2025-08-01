const productsContainer = document.getElementById("produsts");
const likeBox = document.getElementById("like-box");

function renderLiked() {
  const likedItems = JSON.parse(localStorage.getItem('liked')) || [];

  productsContainer.innerHTML = '';
  if (likedItems.length === 0) {
    likeBox.style.display = 'block';
    productsContainer.style.display = 'none';
  } else {
    likeBox.style.display = 'none';
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
    const favorite_btn = document.createElement('button');
    favorite_btn.className = 'favorite-btn';

    const icon = document.createElement('img');
    const liked = JSON.parse(localStorage.getItem('liked')) || [];
    const isLiked = liked.some(el => el.id === item.id);
    icon.src = isLiked ? '/public/Vector2.png' : '/public/Vector.png';

    favorite_btn.appendChild(icon);

    favorite_btn.addEventListener("click", (e) => {
      e.stopPropagation();

      let liked = JSON.parse(localStorage.getItem('liked')) || [];

      const itemData = {
        id: item.id,
        title: item.title,
        media: item.media,
        price: item.price
      };

      const exists = liked.some(el => el.id === item.id);

      if (!exists) {
        liked.push(itemData);
        localStorage.setItem('liked', JSON.stringify(liked));
        icon.src = '/public/Vector2.png';
      } else {
        liked = liked.filter(el => el.id !== item.id);
        localStorage.setItem('liked', JSON.stringify(liked));
        icon.src = '/public/Vector.png';

        if (window.location.pathname === "/like") {
          renderLiked();
        }
      }
    });


    imgBox.append(img, favorite_btn);

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

renderLiked();
