import axios from "axios";

const productsContainer = document.getElementById("produsts");

// Получаем параметры из URL
const params = new URLSearchParams(window.location.search);
const typeFilter = params.get('type'); // <- фильтр типа, например: "Компьютер"

axios.get('http://localhost:7777/goods')
  .then(res => {
    let goods = res.data;

    // 🔍 Если есть фильтр в URL, отфильтруем
    if (typeFilter) {
      goods = goods.filter(item => item.type === typeFilter);
    }

    renderProducts(goods); // отрисовать карточки товаров
  })
  .catch(err => {
    console.error('Ошибка при загрузке товаров:', err);
  });

function renderProducts(goods) {
  productsContainer.innerHTML = '';

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
        showMessage('Добавлено в избранное');
      } else {
        liked = liked.filter(el => el.id !== item.id);
        localStorage.setItem('liked', JSON.stringify(liked));
        icon.src = '/public/Vector.png';
        showMessage('Удалено из избранного');
      }
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
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      const itemData = {
        id: item.id,
        title: item.title,
        media: item.media,
        price: item.price
      };

      const exists = cart.some(el => el.id === item.id);
      if (!exists) {
        cart.push(itemData);
        localStorage.setItem('cart', JSON.stringify(cart));
        showMessage('Товар добавлен в корзину');
      } else {
        showMessage('Этот товар уже в корзине');
      }
    });

    const img2 = document.createElement('img');
    img2.src = '/public/Group 237756.png';
    karsin.appendChild(img2);

    k_t.appendChild(h4);
    k_t.appendChild(karsin);

    text.appendChild(tide);
    text.appendChild(skd);
    text.appendChild(k_t);

    img_box.appendChild(img_pr);
    img_box.appendChild(favorite_btn);

    product.appendChild(img_box);
    product.appendChild(text);

    product.addEventListener('click', () => {
      const id = product.dataset.id;
      sessionStorage.setItem('currentProductId', id);
      window.history.pushState({}, '', '/produkt');
      location.reload();
    });

    productsContainer.appendChild(product);
  }
}

function showMessage(text) {
  const msg = document.createElement('div');
  msg.className = 'notification';
  msg.textContent = text;

  document.body.appendChild(msg);

  setTimeout(() => {
    msg.remove();
  }, 1000);
}
