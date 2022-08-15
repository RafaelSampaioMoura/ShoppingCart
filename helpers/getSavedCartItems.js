const getSavedCartItems = () => {
  // seu código aqui
  const theCart = document.querySelector('ol.cart__items');
  theCart.innerHTML = localStorage.getItem('cartItems');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
