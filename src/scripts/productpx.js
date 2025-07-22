import axios from "axios";

const similarContainer = document.getElementById("produsts"); 
const currentId = sessionStorage.getItem("currentProductId");

axios.get("http://localhost:7777/goods")
  .then((res) => {
    const allGoods = res.data;

    // Находим текущий товар
    const currentProduct = allGoods.find(item => item.id == currentId);
    if (!currentProduct) return;

    // Фильтруем похожие товары
    const similarGoods = allGoods
      .filter(item => item.id != currentProduct.id && item.type === currentProduct.type)
      .slice(0, 4); // максимум 4 похожих

    renderSimilarProducts(similarGoods);
  })
  .catch((err) => {
    console.error("Ошибка при загрузке похожих товаров:", err);
  });

function renderSimilarProducts(goods) {
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

    const img = document.createElement('img');
    img.src = '/public/Vector.png';

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

    const img2 = document.createElement('img');
    img2.src = '/public/Group 237756.png';

    // Сборка карточки
    favorite_btn.appendChild(img);
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

    // Переход на /produkt
    product.addEventListener('click', async () => {
      sessionStorage.setItem('currentProductId', item.id);
      window.location.href = '/produkt';
    });

    similarContainer.appendChild(product);
  }
}
