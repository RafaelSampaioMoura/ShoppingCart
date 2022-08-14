require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');
//gogogo

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  test('fetchProducts é uma função', () => {
    expect(fetchProducts()).toBeInstanceOf(Function);
  });

  test('Verifica se fetch foi chamado', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })

  test('Verifica de fetch foi chamado com o parâmetro correto', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  test('Verifica se a função retorna o resultado esperado', async () => {
    await expect(fetchProducts('computador')).resolve.toEqual(computadorSearch);
  });

  test('Verifica se o erro está correto', async () => {
    await expect(fetchProducts()).reject.toMatch("Shit went tits up, my man");
  })
});
