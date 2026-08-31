import axios from "axios";
import { showMessage } from "./showMessage.js";
import {
    getLikedProducts,
    saveLikedProducts,
    getCartProducts,
    saveCartProducts
} from "./storage.js";



let allGoods = [];
let currentIndex = 0;
const batchSize = 10;

const productsContainer = document.getElementById("produsts");
const showMoreBtn = document.getElementById("show-more-btn");

// Загрузка товаров
axios.get('http://localhost:7777/goods')
  .then((res) => {
    allGoods = res.data;
    renderNextBatch();
  })
  .catch((err) => console.error('Ошибка при загрузке:', err));

function renderNextBatch() {
  const nextItems = allGoods.slice(currentIndex, currentIndex + batchSize);
  createProductCard(nextItems);
  currentIndex += batchSize;

  if (currentIndex >= allGoods.length) {
    showMoreBtn.style.display = 'none';
  }
}
showMoreBtn.addEventListener('click', renderNextBatch);

function createProductData(item) {
  return {
    id: item.id,
    title: item.title,
    media: item.media,
    price: item.price
  };
}
function toggleFavorite(item, icon) {
  let likedProducts = getLikedProducts();

  const itemData = createProductData(item);
  const exists = likedProducts.some(el => el.id === item.id);

  if (!exists) {
    likedProducts.push(itemData);
    saveLikedProducts(likedProducts);

    icon.src = "/Vector2.png";
    showMessage("Добавлено в избранное");
  } else {
    likedProducts = likedProducts.filter(el => el.id !== item.id);
    saveLikedProducts(likedProducts);

    icon.src = "/Vector.png";
    showMessage("Удалено из избранного");
  }
}

function createProductCard(goods) {
  const likedProducts = getLikedProducts();

  for (let item of goods) {
    const formattedPrice = Number(item.price).toLocaleString("ru-RU");

    const product = document.createElement('div');
    product.className = 'product';
    product.dataset.id = item.id;

    const img_box = document.createElement('div');
    img_box.className = 'img_box';

    const img_pr = document.createElement('img');
    img_pr.src = item.media;
    img_pr.className = 'img_pr';

    const favorite_btn = document.createElement('button');
    favorite_btn.className = 'favorite-btn';

    const icon = document.createElement('img');
    const isLiked = likedProducts.some(el => el.id === item.id);
    icon.src = isLiked ? "/Vector2.png" : "/Vector.png";

    favorite_btn.appendChild(icon);

    favorite_btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(item, icon);
    });


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

    const karsin = document.createElement('button');
    karsin.className = 'karsin';
    karsin.addEventListener("click", (e) => {
      e.stopPropagation();
      const cartProducts = getCartProducts();
      const itemData = createProductData(item);
      const exists = cartProducts.some(el => el.id === item.id);

      if (!exists) {
        cartProducts.push(itemData);
        saveCartProducts(cartProducts);
        showMessage("Товар добавлен в корзину");
      } else {
        showMessage("Этот товар уже в корзине");
      }
    });

    const img2 = document.createElement('img');
    img2.src = '/Group 237756.png';

    // Сборка DOM
    img_box.appendChild(img_pr);
    img_box.appendChild(favorite_btn);

    karsin.appendChild(img2);
    k_t.appendChild(h4);
    k_t.appendChild(karsin);

    text.appendChild(tide);
    text.appendChild(skd);
    text.appendChild(k_t);

    product.appendChild(img_box);
    product.appendChild(text);

    product.addEventListener('click', async () => {
      const id = product.dataset.id;
      sessionStorage.setItem('currentProductId', id);

      window.history.pushState({}, '', '/produkt');
      location.reload();
    });

    productsContainer.appendChild(product);
  }
}

