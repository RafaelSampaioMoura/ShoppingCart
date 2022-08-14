const fetchItem = async (itemid) => {
  // seu código aqui
  // comment for commit
  try {
    const result = await fetch(`https://api.mercadolibre.com/items/${itemid}`);
    const item = await result.json();
    return item;
  } catch (error) {
    return 'You must provide an url';
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
