import axios from "axios";

// ---------- Верхнее меню ----------

const img_g = document.createElement('img');
img_g.src = '/public/Group.png';
img_g.alt = 'Логотип';
img_g.id = 'img_g';

const katalog = document.createElement('button');
katalog.className = 'katalog';
katalog.textContent = 'Каталог';

const search_w = document.createElement('div');
search_w.className = 'search-wrapper';

const search = document.createElement('input');
search.type = 'search';
search.id = 'search-input';
search.placeholder = 'Искать товары';

const decoration = document.createElement('span');
decoration.className = 'decoration';

const img_public = document.createElement('img');
img_public.src = '/public/Group 237728.png';
img_public.alt = 'Поиск';

const img_ava = document.createElement('img');
img_ava.src = '/public/Group 237729.jpg';
img_ava.alt = 'Аватар';
img_ava.id = 'ava_img';

const izbreni = document.createElement('a');
izbreni.href = '/like';
izbreni.textContent = 'Избранные';
izbreni.className = 'menuu';
izbreni.id = 'izb';

const kr_nm = document.createElement('div');
kr_nm.className = 'kr_nm';

const korzina = document.createElement('a');
korzina.href = '/korzina';
korzina.textContent = 'Корзина';
korzina.className = 'menuu';
korzina.id = 'kor';

const box = document.createElement('div');
box.className = 'box';

// Вставляем в меню
decoration.appendChild(img_public);
search_w.append(search, decoration);
kr_nm.append(korzina);

const menu = document.getElementById('const_menu');
menu.append(img_g, katalog, search_w, img_ava, izbreni, kr_nm, box);

img_g.addEventListener('click', () => {
  window.location.href = '/';
});

const allMenuLinks = document.querySelectorAll('.menuu');
const currentPath = window.location.pathname;

allMenuLinks.forEach(link => {
  if (link.getAttribute('href') === currentPath) {
    link.classList.add('active');
  }
});

// ---------- Модальное окно ----------

const modal = document.createElement('div');
modal.className = 'modal';

const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(overlay);

const modalContent = document.createElement('div');
modalContent.className = 'modal_content';

const title = document.createElement('p');
title.textContent = 'Категории товаров';

modalContent.appendChild(title);
modal.appendChild(modalContent);
menu.appendChild(modal);

// Открытие и закрытие
katalog.addEventListener('click', () => {
  modal.classList.toggle('active');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  modal.classList.remove('active');
  overlay.classList.remove('active');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

// ---------- Получаем категории и выводим ----------

axios.get('http://localhost:7777/goods')
  .then(res => {
    const goods = res.data;

    // Считаем количество товаров по типу
    const categories = {};

    for (const item of goods) {
      const type = item.type;
      categories[type] = (categories[type] || 0) + 1;
    }

    // Выводим кнопки по категориям
    for (const [type, count] of Object.entries(categories)) {
      const btn = document.createElement('button');
      btn.className = 'category_btn';
      btn.innerHTML = `<h1>${type}<span class="count">(${count})</span></h1>`;
      modalContent.appendChild(btn);
    }
  })
  .catch(err => {
    console.error('Ошибка при загрузке товаров:', err);
  });
