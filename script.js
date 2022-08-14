const computerList = document.querySelector('section .items');

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
    cartBtns.forEach((btn) => btn.addEventListener('click', createCartItemElement));

    computerList.appendChild(section);
  });
};

const getSkuFromProductItem = (item) =>
  item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  // coloque seu código aqui
};

const createCartItemElement = async (e) => {
  const li = document.createElement('li');
  const theCartList = document.querySelector('section .cart__items');
  const itemid = e.target.parentElement.firstChild.innerHTML;
  const item = await fetchItem(itemid);
  const sku = item.id;
  const name = item.title;
  const salePrice = item.price
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  theCartList.appendChild(li);
};

window.onload = () => createProductItemElement();
