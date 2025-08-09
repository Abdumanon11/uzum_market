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


const overlayCatalog = document.createElement('div');
overlayCatalog.className = 'overlay';
document.body.appendChild(overlayCatalog);

const modalCatalog = document.createElement('div');
modalCatalog.className = 'modal';

const modalContentCatalog = document.createElement('div');
modalContentCatalog.className = 'modal_content';

const title = document.createElement('p');
title.textContent = 'Категории товаров';

modalContentCatalog.appendChild(title);
modalCatalog.appendChild(modalContentCatalog);
menu.appendChild(modalCatalog);

katalog.addEventListener('click', () => {
  modalCatalog.classList.toggle('active');
  overlayCatalog.classList.toggle('active');
});

overlayCatalog.addEventListener('click', () => {
  modalCatalog.classList.remove('active');
  overlayCatalog.classList.remove('active');
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
      modalContentCatalog.appendChild(btn);
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
const overlay_ps = document.createElement('div');
overlay_ps.className = 'overlay_ps';
document.body.appendChild(overlay_ps);

const modal_ps = document.createElement('div');
modal_ps.className = 'modal_ps';

const modal_cont = document.createElement('div');
modal_cont.className = 'modal_cont';

const uzumid_logo = document.createElement('img');
uzumid_logo.src = '/public/Group.png';
uzumid_logo.alt = 'Uzum ID';
uzumid_logo.className = 'uzumid_logo';

const input_tel = document.createElement('input');
input_tel.type = 'tel';
input_tel.placeholder = '+998 __ ___ __ __';
input_tel.className = 'input_tel';

const btn_get_code = document.createElement('button');
btn_get_code.textContent = 'Получить код';
btn_get_code.className = 'btn_get_code';

btn_get_code.addEventListener('click', () => {
  const phone = input_tel.value.trim();

  if (!phone.startsWith('+998') || phone.length < 13) {
    alert('Введите корректный номер телефона');
    return;
  }

  localStorage.setItem('userPhone', phone);
  alert('Регистрация прошла успешно!');
  modal_ps.classList.remove('active');
  overlay_ps.classList.remove('active');
});

modal_cont.append(uzumid_logo, input_tel, btn_get_code);
modal_ps.appendChild(modal_cont);
document.body.appendChild(modal_ps);


img_ava.addEventListener('click', () => {
  modal_ps.classList.add('active');
  overlay_ps.classList.add('active');
});


overlay_ps.addEventListener('click', () => {
  modal_ps.classList.remove('active');
  overlay_ps.classList.remove('active');
});

