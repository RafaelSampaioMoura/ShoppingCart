// const fetch = require('node-fetch');

const fetchProducts = async (term) => {
  // seu código aqui
  try {
    const computerList = await fetch(
      `https://api.mercadolibre.com/sites/MLB/search?q=${term}`,
    );
    const computerListData = await computerList.json();
    return computerListData;
  } catch (error) {
    return "Um erro aconteceu na requisição dos produtos. Por favor, tente novamente.";
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
