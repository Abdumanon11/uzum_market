import axios from "axios";
import {
  getLikedProducts,
  saveLikedProducts,
  getCartProducts,
  saveCartProducts
} from "./storage.js";
import { showMessage } from "./showMessage.js";

const id = sessionStorage.getItem('currentProductId');

if (id) {
  axios.get(`http://localhost:7777/goods/${id}`)
    .then((res) => {
      createProduct(res.data);
    })
    .catch((err) => console.error('Ошибка при загрузке товара:', err));
} else {
  console.warn('ID товара не найден');
}

function createProduct(item) {
  const product = document.getElementById('pro_box');
  if (!product) return console.error('Контейнер #pro_box не найден');

  const formattedPrice = Number(item.price).toLocaleString("ru-RU");

  const pr_img = document.createElement('div');
  pr_img.className = 'pro_img';

  const box_img = document.createElement('div');
  box_img.className = 'box_img';

  for (let i = 0; i < 5; i++) {
    const img = document.createElement('img');
    img.className = 'm_img';
    img.src = item.media;
    box_img.appendChild(img);
  }

  const img_gl = document.createElement('img');
  img_gl.className = 'img_gl';
  img_gl.src = item.media;

  const text_box = document.createElement('div');
  text_box.className = 'text_box';

  const h1 = document.createElement('h1');
  h1.textContent = item.title;

  const price = document.createElement('div');
  price.className = 'price';

  const h3 = document.createElement('h3');
  h3.textContent = `${formattedPrice} сум`;

  const h3_2 = document.createElement('h3');
  h3_2.className = 'h3_2';
  h3_2.textContent = `${formattedPrice} сум`;

  const num_box = document.createElement('div');
  num_box.className = 'num_box';

  const minusBtn = document.createElement('button');
  minusBtn.textContent = '-';

  const quantityText = document.createElement('p');
  quantityText.textContent = '1';

  const plusBtn = document.createElement('button');
  plusBtn.textContent = '+';

  let quantity = 1;
  plusBtn.onclick = () => {
    quantity++;
    quantityText.textContent = quantity;
    updateTotal();
  };
  minusBtn.onclick = () => {
    if (quantity > 1) {
      quantity--;
      quantityText.textContent = quantity;
      updateTotal();
    }
  };

  function updateTotal() {
    const total = (item.price * quantity).toLocaleString('ru-RU');
    h3_2.textContent = `${total} сум`;
  }

  const pl_box = document.createElement('div');
  pl_box.className = 'pl_box';

  const poloska = document.createElement('div');
  poloska.className = 'poloska';

  const pp = document.createElement('div');
  pp.className = 'pp';

  const p_2 = document.createElement('p');
  p_2.textContent = item.description;

  const btn_box = document.createElement('div');
  btn_box.className = 'btn__box';


  const kar = document.createElement('button');
  kar.className = 'kar';
  kar.textContent = 'Добавить в корзину';

  kar.addEventListener("click", () => {
    const cart = getCartProducts()
    const itemData = {
      id: item.id,
      title: item.title,
      media: item.media,
      price: item.price,
      quantity,
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

  const lik = document.createElement('button');
  lik.className = 'lik';
  lik.textContent = 'Добавить в избранное';

  lik.addEventListener("click", () => {
    const liked = getLikedProducts();
    const itemData = {
      id: item.id,
      title: item.title,
      media: item.media,
      price: item.price
    };
    const exists = liked.some(el => el.id === item.id);
    if (!exists) {
      liked.push(itemData);
      saveLikedProducts(liked);
      showMessage('Добавлено в избранное');
    } else {
      showMessage('Уже в избранном');
    }
  });

  const ops = document.createElement('div');
  ops.className = 'ops';

  const h2 = document.createElement('h2');
  h2.textContent = 'Описание товара';

  const pp_2 = document.createElement('p');
  pp_2.textContent = item.description;

  // Сборка
  pr_img.append(box_img, img_gl);
  price.append(h3, h3_2);
  num_box.append(minusBtn, quantityText, plusBtn);
  pl_box.appendChild(poloska);
  pp.appendChild(p_2);
  btn_box.append(kar, lik);
  ops.append(h2, pp_2);
  text_box.append(h1, price, num_box, pl_box, pp, btn_box, ops);
  product.append(pr_img, text_box);
}
