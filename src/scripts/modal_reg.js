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


const img_ava = document.getElementById('ava_img');
img_ava.addEventListener('click', () => {
  modal_ps.classList.add('active');
  overlay_ps.classList.add('active');
});


overlay_ps.addEventListener('click', () => {
  modal_ps.classList.remove('active');
  overlay_ps.classList.remove('active');
});
