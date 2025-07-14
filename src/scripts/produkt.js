import axios from "axios";

axios.get('http://localhost:7777/goods')
    .then((res) => {
        const goods = res.data;
        createProduct(goods);
    })



function createProduct(goods) {

    const product = document.getElementById('pro_box');

    for (let item of goods) {

        const pr_img = document.createElement('div')
        pr_img.className = 'pro_img'
        const box_img = document.createElement('div')
        box_img.className = 'box_img'

        const img1 = document.createElement('img');
        img1.className = 'm_img';
        img1.src = item.media;

        const img2 = document.createElement('img');
        img2.className = 'm_img';
        img2.src = item.media;

        const img3 = document.createElement('img');
        img3.className = 'm_img';
        img3.src = item.media;

        const img4 = document.createElement('img');
        img4.className = 'm_img';
        img4.src = item.media;

        const img5 = document.createElement('img');
        img5.className = 'm_img';
        img5.src = item.media;


        const img_gl = document.createElement('img')
        img_gl.className = 'img_gl'
        img_gl.src = item.media


        const text_box = document.createElement('div')
        text_box.className = 'text_box'
        const h1 = document.createElement('h1');
        h1.textContent =item.title
        const price = document.createElement('div')
        price.className = 'price'
        const h3 = document.createElement('h3')
        h3.textContent = item.price
        const h3_2 = document.createElement('h3')
        h3_2.textContent = item.price
        const num_box = document.createElement('div')
        num_box.className = 'num_box'
        const button = document.createElement('button')
        button.textContent = '-'
        const p = document.createElement('p')
        p.textContent = '1'
        const button_2 = document.createElement('button')
        button_2.textContent = '+'
        const pl_box = document.createElement('div')
        pl_box.className = 'pl_box'
        const poloska = document.createElement('div')
        poloska.className = 'poloska'
        const pp = document.createElement('div')
        pp.className = 'pp'
        const p_2 = document.createElement('p')
        p_2.textContent = item.description
        const btn_box = document.createElement('div')
        btn_box.className = 'btn_box'
        const kar = document.createElement('button')
        kar.className = 'kar'
        const lik = document.createElement('button')
        lik.className = 'lik'
        const ops = document.createElement('div')
        ops.className = 'ops'
        const h2 = document.createElement('h2')
        h2.textContent = 'Описание товара'
        const pp_2 = document.createElement('p')
        pp_2.textContent = item.description



        


        box_img.appendChild(img1)
        box_img.appendChild(img2)
        box_img.appendChild(img3)
        box_img.appendChild(img4)
        box_img.appendChild(img5)
        pr_img.appendChild(box_img)
        pr_img.appendChild(img_gl)




        price.appendChild(h3)
        price.appendChild(h3_2)

        num_box.appendChild(button)
        num_box.appendChild(p)
        num_box.appendChild(button_2)

        pl_box.appendChild(poloska)

        pp.appendChild(p_2)
        
        btn_box.appendChild(kar)
        btn_box.appendChild(lik)
        ops.appendChild(h2)
        ops.appendChild(pp_2)

        text_box.appendChild(h1)
        text_box.appendChild(price)
        text_box.appendChild(num_box)
        text_box.appendChild(pl_box)
        text_box.appendChild(pp)


        product.append(pr_img,text_box)

    }

}
