import axios from "axios";

let allGoods = [];
let currentIndex = 0;
const batchSize = 10;

const productsContainer = document.getElementById("produsts");
const showMoreBtn = document.getElementById("show-more-btn");

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
    
    
    function createProductCard(goods) {
        for (let item of goods) {
            const formattedPrice = Number(item.price).toLocaleString("ru-RU");
            const product = document.createElement('div');
            product.className = 'product';
            product.id = 'product_id'

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

        productsContainer.appendChild(product);
    }
}

const product_id = document.getElementById('product_id');

if (product_id) {
    product_id.addEventListener('click', () => {
        const itemId = product_id.dataset.id;
        window.location.href = `/product.html?id=${itemId}`;
    });
}


