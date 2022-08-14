require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  test('fetchItem é uma função', () => {
    expect(fetchItem).toBeInstanceOf(Function);
  });

  test('Verifica se fetch foi chamado', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  test('Verifica de fetch foi chamado com o parâmetro correto', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.mercadolibre.com/items/MLB1615760527'
    );
  });

  test('Verifica se a função retorna o resultado esperado', async () => {
    await expect(fetchItem('MLB1615760527')).toEqual(item);
  });

  test('Verifica se o erro está correto', async () => {
    await expect(fetchItem()).toEqual('You must provide an url');
  });
});
