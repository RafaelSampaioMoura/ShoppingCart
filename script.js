const computerList = document.querySelector('section .items');
const clearBtn = document.querySelector('button.empty-cart');
const shoppingList = document.querySelector('ol.cart__items');

const clearCart = () => {
  const theCart = document.querySelector('ol.cart__items');
  theCart.innerHTML = '';
  saveCartItems(document.querySelector('ol.cart__items').innerHTML);
};

clearBtn.addEventListener('click', clearCart);
const cartItemClickListener = (event) => {
  // coloque seu código aqui
  event.target.remove();
  totalPrice();
};

const restablishCart = () => {
  const theCart = getSavedCartItems();
  document.querySelector('ol.cart__items').innerHTML = theCart;
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
  saveCartItems(document.querySelector('ol.cart__items').innerHTML);
  totalPrice();
};

const createProductItemElement = async (sku, name, image) => {
  const response = await fetchProducts('computador');
  const computers = response.results;

  computers.forEach((computer) => {
    const section = document.createElement('section');
    section.className = 'item';
    sku = computer.id;
    name = computer.title;
    image = computer.thumbnail;
    section.appendChild(createCustomElement('span', 'item__sku', sku));
    section.appendChild(createCustomElement('span', 'item__title', name));
    section.appendChild(createProductImageElement(image));
    section.appendChild(
      createCustomElement('button', 'item__add', 'Adicionar ao carrinho!')
    );
    const cartBtns = document.querySelectorAll('.item__add');
    cartBtns.forEach((btn) =>
      btn.addEventListener('click', createCartItemElement)
    );

    computerList.appendChild(section);
    restablishCart();
  });
};

// const getSkuFromProductItem = (item) =>
//   item.querySelector('span.item__sku').innerText;

const totalPrice = () => {
  const theCart = document.querySelector('ol.cart__items');
  const showPrice = document.querySelector('span.total-price');
  const cartItems = document.querySelectorAll('li.cart__item');
  let sum = 0;
  cartItems.forEach((item) => {
    const thePrice = item.textContent.split('$');
    sum += Number(thePrice[1]);
    showPrice.textContent = sum;
  });
  showPrice.innerText = `Preço Total: ${sum.toLocaleString(2)}`;
  theCart.appendChild(showPrice);
};

window.onload = () => {
  createProductItemElement();
};
// window.onunload = () =>
//   ;
