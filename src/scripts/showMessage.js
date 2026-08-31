export function showMessage(text) {
  const msg = document.createElement('div');
  msg.className = 'notification';
  msg.textContent = text;

  document.body.appendChild(msg);

  setTimeout(() => {
    msg.remove();
  }, 3000); 
}
