import axios from "axios";

axios.get('http://localhost:7777/goods')
  .then((res) => {
    const allGoods = res.data;

    // Получаем ID товаров из корзины (localStorage)
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Сопоставляем товары из корзины с данными с сервера
    const cartGoods = allGoods
      .filter(item => cartItems.some(ci => ci.id === item.id))
      .map(item => {
        const storedItem = cartItems.find(ci => ci.id === item.id);
        return {
          ...item,
          quantity: storedItem.quantity || 1
        };
      });

    cretkorzina(cartGoods);
  })
  .catch(err => console.error("Ошибка при получении товаров:", err));

function cretkorzina(goods) {
  const tovars = document.getElementById('tovars');
  const box_ofr = document.getElementById('box_ofr');
  const conteiner = document.querySelector('.conteiner');
  const conteine = document.getElementById('conteine');

  tovars.innerHTML = '';
  box_ofr.innerHTML = '';

  const oldKorzina = document.querySelector('.korzina_box');
  if (oldKorzina) oldKorzina.remove();

  if (goods.length === 0) {
    const korzinaBox = document.createElement('div');
    korzinaBox.className = 'korzina_box';

    const img = document.createElement('img');
    img.src = '/public/shopocat 1.png';
    img.alt = '';

    const h1 = document.createElement('h1');
    h1.textContent = 'В корзине пока нет товаров';

    const h3 = document.createElement('h3');
    h3.textContent = 'Начните с подборок на главной странице или найдите нужный товар через поиск';

    korzinaBox.append(img, h1, h3);
    conteiner.prepend(korzinaBox);

    tovars.style.display = 'none';
    box_ofr.style.display = 'none';
    conteine.style.display = 'none';
    return;
  }

  tovars.style.display = '';
  box_ofr.style.display = '';
  conteine.style.display = '';

  let totalSum = 0;

  const h1 = document.createElement('h1');
  h1.classList.add('h1_kr');
  h1.textContent = 'Корзина товаров';
  tovars.appendChild(h1);

  const p_pr = document.createElement('h2');
  const itogo = document.createElement('p');
  const ofr = document.createElement('button');
  ofr.classList.add('ofr');
  ofr.textContent = 'Оформить';

  function updateTotal() {
    p_pr.textContent = `${totalSum.toLocaleString("ru-RU")} сум`;
    const countTovars = tovars.querySelectorAll('.tovar').length;
    itogo.textContent = `Итого товаров: ${countTovars}`;
  }

  for (let item of goods) {
    let count = item.quantity || 1;
    let price = parseFloat(item.price);
    totalSum += price * count;

    const tovar = document.createElement('div');
    tovar.classList.add('tovar');

    const tovar_img = document.createElement('div');
    tovar_img.classList.add('tovar_img');

    const img = document.createElement('img');
    img.src = item.media;

    const tovar_info = document.createElement('div');
    tovar_info.classList.add('tovar_info');

    const p_1 = document.createElement('p');
    p_1.textContent = item.title;

    const p_2 = document.createElement('p');
    p_2.textContent = `${price.toLocaleString("ru-RU")} сум`;

    const sum = document.createElement('p');
    sum.textContent = `Сумма: ${(price * count).toLocaleString("ru-RU")} сум`;

    const BTN_BOX = document.createElement('div');
    BTN_BOX.classList.add('BTN_BOX');

    const plass = document.createElement('button');
    plass.textContent = '+';

    const p_num = document.createElement('p');
    p_num.textContent = count;

    const minus = document.createElement('button');
    minus.textContent = '-';

    const del = document.createElement('button');
    del.textContent = 'Удалить';
    del.classList.add('del');

    plass.addEventListener('click', () => {
      count++;
      p_num.textContent = count;
      sum.textContent = `Сумма: ${(price * count).toLocaleString("ru-RU")} сум`;
      totalSum += price;
      updateTotal();

      updateCartStorage(item.id, count);
    });

    minus.addEventListener('click', () => {
      if (count > 1) {
        count--;
        p_num.textContent = count;
        sum.textContent = `Сумма: ${(price * count).toLocaleString("ru-RU")} сум`;
        totalSum -= price;
        updateTotal();

        updateCartStorage(item.id, count);
      }
    });

    del.addEventListener('click', () => {
      tovars.removeChild(tovar);
      totalSum -= price * count;
      updateTotal();
      removeFromCart(item.id);

      if (tovars.querySelectorAll('.tovar').length === 0) {
        cretkorzina([]);
      }
    });

    BTN_BOX.append(plass, p_num, minus);
    tovar_img.appendChild(img);
    tovar_info.append(p_1, p_2, sum, BTN_BOX, del);
    tovar.append(tovar_img, tovar_info);
    tovars.appendChild(tovar);
  }

  updateTotal();
  box_ofr.append(p_pr, itogo, ofr);
}

// Обновляет количество товара в localStorage
function updateCartStorage(id, count) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const idx = cart.findIndex(el => el.id === id);
  if (idx !== -1) {
    cart[idx].quantity = count;
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

// Удаляет товар из localStorage
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(el => el.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
}
