const saveCartItems = () => {
  // seu código aqui
  const cartToSave = document.querySelector('ol.cart__items').innerHTML;
  localStorage.setItem('cartItems', cartToSave);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
