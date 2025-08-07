import axios from "axios";

// --- ЭЛЕМЕНТЫ МЕНЮ ---
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

const korzina = document.createElement('a');
korzina.href = '/korzina';
korzina.textContent = 'Корзина';
korzina.className = 'menuu';
korzina.id = 'kor';

const kr_nm = document.createElement('div');
kr_nm.className = 'kr_nm';

const box = document.createElement('div');
box.className = 'box';

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

// Открытие/закрытие модалки
katalog.addEventListener('click', () => {
  modal.classList.toggle('active');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  modal.classList.remove('active');
  overlay.classList.remove('active');
});


let allGoods = [];

axios.get('http://localhost:7777/goods')
  .then(res => {
    allGoods = res.data;

    const categories = {};
    for (const item of allGoods) {
      const type = item.type;
      categories[type] = (categories[type] || 0) + 1;
    }

    for (const [type, count] of Object.entries(categories)) {
      const btn = document.createElement('button');
      btn.className = 'category_btn';
      btn.innerHTML = `<h1>${type} <span class="count">(${count})</span></h1>`;
      btn.addEventListener('click', () => {
        const encodedType = encodeURIComponent(type);
        window.location.href = `/katalog?type=${encodedType}`;
      });
      modalContent.appendChild(btn);
    }
  })
  .catch(err => {
    console.error('Ошибка при загрузке товаров:', err);
  });



const searchModal = document.createElement('div');
searchModal.id = 'search-modal';
searchModal.className = 'hidden';

const resultsContainer = document.createElement('div');
resultsContainer.className = 'results-container';
searchModal.appendChild(resultsContainer);
document.body.appendChild(searchModal);


search.addEventListener('input', () => {
  const query = search.value.trim().toLowerCase();

  if (query === '') {
    searchModal.classList.add('hidden');
    resultsContainer.innerHTML = '';
    return;
  }

  const filtered = allGoods.filter(item =>
    item.title.toLowerCase().includes(query)
  );

  resultsContainer.innerHTML = '';

  if (filtered.length === 0) {
    const noResult = document.createElement('p');
    noResult.textContent = 'Нет совпадений';
    resultsContainer.appendChild(noResult);
  } else {
    filtered.forEach(item => {
      const resultItem = document.createElement('div');
      resultItem.textContent = item.title;
      resultItem.className = 'result-item';

      resultItem.addEventListener('click', () => {
        sessionStorage.setItem('currentProductId', item.id);
        window.location.href = '/produkt';
      });

      resultsContainer.appendChild(resultItem);
    });
  }

  searchModal.classList.remove('hidden');
});

document.addEventListener('click', (e) => {
  if (!search.contains(e.target) && !searchModal.contains(e.target)) {
    searchModal.classList.add('hidden');
  }
});
