import {
  productResponseAdapter,
  productsResponseAdapter,
} from '@modules/products/domain/product.adapter';
import { ProductResponse } from '@modules/products/domain/product.model';

describe('product.adapter', () => {
  const mockProductResponse: ProductResponse = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    logo: 'https://example.com/logo.png',
    date_release: new Date('2024-01-01'),
    date_revision: new Date('2025-01-01'),
  };

  describe('productResponseAdapter', () => {
    it('adapts a single product response correctly', () => {
      const result = productResponseAdapter(mockProductResponse);

      expect(result.id).toBe('1');
      expect(result.name).toBe('Test Product');
      expect(result.description).toBe('Test Description');
      expect(result.logo).toBe('https://example.com/logo.png');
    });

    it('maps date_release to releaseDate', () => {
      const result = productResponseAdapter(mockProductResponse);
      expect(result.releaseDate).toBeInstanceOf(Date);
    });

    it('maps date_revision to revisionDate', () => {
      const result = productResponseAdapter(mockProductResponse);
      expect(result.revisionDate).toBeInstanceOf(Date);
    });

    it('preserves all basic fields', () => {
      const result = productResponseAdapter(mockProductResponse);
      expect(result.id).toBe(mockProductResponse.id);
      expect(result.name).toBe(mockProductResponse.name);
      expect(result.description).toBe(mockProductResponse.description);
      expect(result.logo).toBe(mockProductResponse.logo);
    });
  });

  describe('productsResponseAdapter', () => {
    it('adapts an array of product responses', () => {
      const mockProducts: ProductResponse[] = [
        mockProductResponse,
        {
          ...mockProductResponse,
          id: '2',
          name: 'Second Product',
        },
      ];

      const result = productsResponseAdapter(mockProducts);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('1');
      expect(result[1].id).toBe('2');
    });

    it('returns empty array for empty input', () => {
      const result = productsResponseAdapter([]);
      expect(result).toEqual([]);
    });

    it('maps each item using productResponseAdapter', () => {
      const mockProducts: ProductResponse[] = [
        {
          id: '123',
          name: 'Product A',
          description: 'Desc A',
          logo: 'logo-a.png',
          date_release: new Date('2023-06-15'),
          date_revision: new Date('2024-06-15'),
        },
      ];

      const result = productsResponseAdapter(mockProducts);

      expect(result[0].id).toBe('123');
      expect(result[0].name).toBe('Product A');
      expect(result[0].releaseDate).toBeInstanceOf(Date);
      expect(result[0].revisionDate).toBeInstanceOf(Date);
    });
  });
});
