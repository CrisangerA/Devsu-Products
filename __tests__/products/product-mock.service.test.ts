import productMockService, {
  MOCK_PRODUCTS,
} from '@modules/products/infrastructure/product-mock.service';

describe('ProductMockService', () => {
  describe('getAll', () => {
    it('returns all mock products', async () => {
      const result = await productMockService.getAll();
      expect(result).toEqual(MOCK_PRODUCTS);
    });
  });

  describe('getOne', () => {
    it('returns product by id', async () => {
      const result = await productMockService.getOne('1');
      expect(result).toHaveProperty('id', '1');
      expect(result).toHaveProperty('name', 'Product 1');
    });
  });

  describe('create', () => {
    it('returns created product', async () => {
      const newProduct = {
        id: '3',
        name: 'New Product',
        description: 'New description',
        logo: 'https://example.com/new.png',
        date_release: new Date(),
        date_revision: new Date(),
      };
      const result = await productMockService.create(newProduct as any);
      expect(result).toEqual(newProduct);
    });
  });

  describe('update', () => {
    it('returns updated product', async () => {
      const updatedProduct = {
        id: '1',
        name: 'Updated Product',
        description: 'Updated description',
        logo: 'https://example.com/updated.png',
        date_release: new Date(),
        date_revision: new Date(),
      };
      const result = await productMockService.update(updatedProduct as any);
      expect(result).toEqual(updatedProduct);
    });
  });

  describe('delete', () => {
    it('returns true on delete', async () => {
      const result = await productMockService.delete();
      expect(result).toBe(true);
    });
  });
});
