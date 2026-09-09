import {
  getLikedProducts,
  saveLikedProducts,
  getCartProducts,
  saveCartProducts
} from "./storage.js";

import { showMessage } from "./showMessage.js";

function renderLiked() {
    const productsContainer = document.getElementById("produsts");
    const likeBox = document.getElementById("like-box");

    const likedItems = getLikedProducts();

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
    img.src = item.media[0];
    img.className = 'img_pr';
    const favorite_btn = document.createElement('button');
    favorite_btn.className = 'favorite-btn';

    const icon = document.createElement('img');
    const liked = getLikedProducts();
    const isLiked = liked.some(el => el.id === item.id);
    icon.src = isLiked ? '/public/Vector2.png' : '/public/Vector.png';

    favorite_btn.appendChild(icon);
    favorite_btn.addEventListener("click", (e) => {
      e.stopPropagation();
      let liked = getLikedProducts();

      const exists = liked.some(el => el.id === item.id);
      if (!exists) {
        liked.push({
          id: item.id,
          title: item.title,
          media: item.media,
          price: item.price
        });

        saveLikedProducts(liked);
        icon.src = '/public/Vector2.png';
        showMessage('Добавлено в избранное');
      } else {
        liked = liked.filter(el => el.id !== item.id);

        saveLikedProducts(liked);
        icon.src = '/public/Vector.png';
        showMessage('Удалено из избранного');

        renderLiked();
      }
    });
    imgBox.append(img, favorite_btn);


    const karsin = document.createElement('button');
    karsin.className = 'karsin';
    karsin.addEventListener("click", (e) => {
      e.stopPropagation();

      const cart = getCartProducts();

      const itemData = {
        id: item.id,
        title: item.title,
        media: item.media,
        price: item.price
      };
      const exists = cart.some(el => el.id === item.id);
      if (!exists) {
        cart.push(itemData);
        saveCartProducts(cart);
        showMessage('Товар добавлен в корзину');
      } else {
        showMessage('Этот товар уже в корзине');
      }

    });






    const img2 = document.createElement('img');
    img2.src = '/public/Group 237756.png';


const text = document.createElement('div');
text.className = 'text';

const tide = document.createElement('p');
tide.className = 'tide';
tide.textContent = item.title;

const skd = document.createElement('p');
skd.className = 'skd';
skd.textContent = `${formattedPrice} сум`;

const k_t = document.createElement('div');
k_t.className = 'k_t';

const h4 = document.createElement('h4');
h4.className = 'h4';
h4.textContent = `${formattedPrice} сум`;

karsin.appendChild(img2);

k_t.appendChild(h4);
k_t.appendChild(karsin);

text.appendChild(tide);
text.appendChild(skd);
text.appendChild(k_t);

product.appendChild(imgBox);
product.appendChild(text);

    product.addEventListener('click', () => {
      const id = product.dataset.id;

      window.history.pushState({}, '', `/produkt?id=${id}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    productsContainer.appendChild(product);
  }
}
export function initLike() {
    renderLiked();
}

