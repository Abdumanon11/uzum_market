const img_g = document.createElement('img');
img_g.src = '/public/Group.png';
img_g.alt = 'Логотип';
img_g.id = 'img_g'

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
izbreni.id = 'izb'

const kr_nm = document.createElement('div');
kr_nm.className = 'kr_nm';

const korzina = document.createElement('a'); // Переименовал переменную
korzina.href = '/korzina';
korzina.textContent = 'Корзина';
korzina.className = 'menuu';
korzina.id = 'kor';

const box = document.createElement('div');
box.className = 'box';


// Добавляем элементы
decoration.appendChild(img_public);
search_w.append(search, decoration);
kr_nm.append(korzina);

const menu = document.getElementById('const_menu'); // Обрати внимание на ID в кавычках
menu.append(img_g , katalog , search_w, img_ava, izbreni, kr_nm, box,);


const img = document.getElementById('img_g');

if (img) {
    img.addEventListener('click', () => {
        window.location.href = '/';
    });
}

const allMenuLinks = document.querySelectorAll('.menuu');
const currentPath = window.location.pathname;

allMenuLinks.forEach(link => {
  if (link.getAttribute('href') === currentPath) {
    link.classList.add('active');
  }
});


const modal = document.createElement('div');
modal.className = 'modal';

const modalContent = document.createElement('div');
modalContent.className = 'modal_content';

const title = document.createElement('p');
title.textContent = 'Категории товаров';

const bt = document.createElement('button');
bt.className = 'bt';
bt.innerHTML = '<h1>Бытовая техника</h1>';

const od = document.createElement('button');
od.className = 'od';
od.innerHTML = '<h1>Одежда</h1>';

const ob = document.createElement('button');
ob.className = 'ob';
ob.innerHTML = '<h1>Обувь</h1>';


modalContent.append(title, bt, od, ob);
modal.appendChild(modalContent);
document.body.appendChild(modal)

katalog.addEventListener('click', () => {
  modal.classList.add('active');
});


modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});
