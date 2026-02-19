import { ProductsRoutes } from '@navigation/config/routes';

describe('ProductsRoutes', () => {
  it('should have correct values', () => {
    expect(ProductsRoutes.Home).toBe('Home');
    expect(ProductsRoutes.Form).toBe('Form');
  });
});
