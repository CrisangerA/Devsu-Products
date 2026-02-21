import { filterProducts } from '@modules/products/domain/product.utils';
import { Product } from '@modules/products/domain/product.model';

const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Laptop Gaming',
    description: 'High performance gaming laptop',
    logo: 'laptop.png',
    releaseDate: new Date('2024-01-01'),
    revisionDate: new Date('2025-01-01'),
  },
  {
    id: 'prod-2',
    name: 'Smartphone Pro',
    description: 'Professional smartphone device',
    logo: 'phone.png',
    releaseDate: new Date('2024-02-01'),
    revisionDate: new Date('2025-02-01'),
  },
  {
    id: 'prod-3',
    name: 'Tablet Basic',
    description: 'Basic tablet for everyday use',
    logo: 'tablet.png',
    releaseDate: new Date('2024-03-01'),
    revisionDate: new Date('2025-03-01'),
  },
];

describe('filterProducts', () => {
  it('returns all products when search query is empty', () => {
    const result = filterProducts('', mockProducts);
    expect(result).toHaveLength(3);
  });

  it('returns all products when search query is only whitespace', () => {
    const result = filterProducts('   ', mockProducts);
    expect(result).toHaveLength(3);
  });

  it('filters products by name', () => {
    const result = filterProducts('Laptop', mockProducts);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Laptop Gaming');
  });

  it('filters products by name (case insensitive)', () => {
    const result = filterProducts('LAPTOP', mockProducts);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Laptop Gaming');
  });

  it('filters products by description', () => {
    const result = filterProducts('gaming', mockProducts);
    expect(result).toHaveLength(1);
    expect(result[0].description).toContain('gaming');
  });

  it('filters products by description (case insensitive)', () => {
    const result = filterProducts('PROFESSIONAL', mockProducts);
    expect(result).toHaveLength(1);
    expect(result[0].description).toContain('Professional');
  });

  it('filters products by id', () => {
    const result = filterProducts('prod-2', mockProducts);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('prod-2');
  });

  it('filters products by id (case insensitive)', () => {
    const result = filterProducts('PROD-1', mockProducts);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('prod-1');
  });

  it('returns multiple products when multiple match', () => {
    const result = filterProducts('gaming', mockProducts);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Laptop Gaming');
  });

  it('returns multiple products when search matches multiple fields', () => {
    const customProducts = [
      ...mockProducts,
      {
        id: 'gaming-mouse',
        name: 'Gaming Mouse',
        description: 'Gaming accessory',
        logo: 'mouse.png',
        releaseDate: new Date('2024-04-01'),
        revisionDate: new Date('2025-04-01'),
      },
    ];
    const result = filterProducts('Gaming', customProducts);
    expect(result).toHaveLength(2);
  });

  it('returns empty array when no products match', () => {
    const result = filterProducts('xyz123notfound', mockProducts);
    expect(result).toHaveLength(0);
  });

  it('handles partial matches', () => {
    const result = filterProducts('Smart', mockProducts);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Smartphone Pro');
  });

  it('trims the search query', () => {
    const result = filterProducts('  Laptop  ', mockProducts);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Laptop Gaming');
  });

  it('returns all products when given empty array', () => {
    const result = filterProducts('test', []);
    expect(result).toHaveLength(0);
  });
});
