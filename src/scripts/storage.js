export function getLikedProducts() {
    return JSON.parse(localStorage.getItem("liked")) || [];
}

export function saveLikedProducts(products) {
    localStorage.setItem("liked", JSON.stringify(products));
}

export function getCartProducts() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

export function saveCartProducts(products) {
    localStorage.setItem("cart", JSON.stringify(products));
}

export function updateCartStorage(id, count) {
  const cart = getCartProducts();
  const item = cart.find(item => item.id === id);

  if (item) {
    item.quantity = count;
    saveCartProducts(cart);
  }
}

export function removeFromCart(id) {
  const cart = getCartProducts();

  const updatedCart = cart.filter(item => item.id !== id);

  saveCartProducts(updatedCart);
}