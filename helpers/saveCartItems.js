const saveCartItems = (cartToSave) => {
  // seu código aqui
  localStorage.setItem('cartItems', cartToSave);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
