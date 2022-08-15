const computerList = document.querySelector('section .items');
const clearBtn = document.querySelector('button.empty-cart');
const shoppingList = document.querySelector('ol.cart__items');

// const carregado = () => {
//   const body = document.querySelector('body');
//   body.remove();
// }
const totalPrice = () => {
  const showPrice = document.querySelector('span.total-price');
  const cartItems = document.querySelectorAll('li.cart__item');
  let sum = 0;
  cartItems.forEach((item) => {
    const thePrice = item.textContent.split('$');
    sum += Number(thePrice[1]);
  });
  const sumText = sum.toLocaleString(2).split('.').join('').replace(/,/g, '.');
  showPrice.innerText = `${sumText}`;
};
const clearCart = () => {
  const theCart = shoppingList;
  theCart.innerHTML = '';
  saveCartItems(shoppingList.innerHTML);
  totalPrice();
};

clearBtn.addEventListener('click', clearCart);
const cartItemClickListener = (event) => {
  // coloque seu código aqui
  event.target.remove();
  saveCartItems(shoppingList.innerHTML);
  totalPrice();
};

const restablishCart = () => {
  const theCart = getSavedCartItems();
  shoppingList.innerHTML = theCart;
  const cartItems = document.querySelectorAll('li.cart__item');
  cartItems.forEach((item) => {
    item.addEventListener('click', cartItemClickListener);
  });
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const carregando = () => {
  const items = document.querySelector('section.items');
  const loading = document.createElement('p');
  loading.className = 'loading';
  loading.innerText = 'carregando...';
  items.appendChild(loading);
};

const carregado = () => {
  const remove = document.querySelector('p.loading');
  remove.remove();
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createCartItemElement = async (e) => {
  const li = document.createElement('li');
  const theCartList = document.querySelector('section .cart__items');
  const itemid = e.target.parentElement.firstChild.innerHTML;
  const item = await fetchItem(itemid);
  const sku = item.id;
  const name = item.title;
  const salePrice = item.price;
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  theCartList.appendChild(li);
  saveCartItems(shoppingList.innerHTML);
  totalPrice();
};

const getItemsFromApi = (items) => {
  items.forEach((computer) => {
    const section = document.createElement('section');
    section.className = 'item';
    section.appendChild(createCustomElement('span', 'item__sku', computer.id));
    section.appendChild(
      createCustomElement('span', 'item__title', computer.title),
    );
    section.appendChild(createProductImageElement(computer.thumbnail));
    section.appendChild(
      createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
    );
    const cartBtns = document.querySelectorAll('.item__add');
    cartBtns.forEach((btn) =>
      btn.addEventListener('click', createCartItemElement));
    computerList.appendChild(section);
    restablishCart();
  });
};

const createItem = async () => {
  carregando();
  const response = await fetchProducts('computador');
  carregado();
  const computers = response.results;
  getItemsFromApi(computers);
};

window.onload = () => {
  // carregando();
  // carregado();
  createItem();
};
