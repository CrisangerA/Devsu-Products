import { ProductResponse } from '../domain/product.model';
import { ProductRepository } from '../domain/product.repository';

export const MOCK_PRODUCTS: ProductResponse[] = [
  {
    id: '1',
    name: 'Product 1',
    description: 'Product 1 description',
    logo: 'https://example.com/logo.png',
    date_release: new Date('2024-01-01'),
    date_revision: new Date('2025-01-01'),
  },
  {
    id: '2',
    name: 'Product 2',
    description: 'Product 2 description',
    logo: 'https://example.com/logo2.png',
    date_release: new Date('2024-02-01'),
    date_revision: new Date('2025-02-01'),
  },
  {
    id: '3',
    name: 'Product 3',
    description: 'Product 3 description',
    logo: 'https://example.com/logo3.png',
    date_release: new Date('2024-03-01'),
    date_revision: new Date('2025-03-01'),
  },
  {
    id: '4',
    name: 'Product 4',
    description: 'Product 4 description',
    logo: 'https://example.com/logo4.png',
    date_release: new Date('2024-04-01'),
    date_revision: new Date('2025-04-01'),
  },
  {
    id: '5',
    name: 'Product 5',
    description: 'Product 5 description',
    logo: 'https://example.com/logo5.png',
    date_release: new Date('2024-05-01'),
    date_revision: new Date('2025-05-01'),
  },
  {
    id: '6',
    name: 'Product 6',
    description: 'Product 6 description',
    logo: 'https://example.com/logo6.png',
    date_release: new Date('2024-06-01'),
    date_revision: new Date('2025-06-01'),
  },
  {
    id: '7',
    name: 'Product 7',
    description: 'Product 7 description',
    logo: 'https://example.com/logo7.png',
    date_release: new Date('2024-07-01'),
    date_revision: new Date('2025-07-01'),
  },
];

class ProductMockService implements ProductRepository {
  getAll(): Promise<ProductResponse[] | Error> {
    return Promise.resolve(MOCK_PRODUCTS);
  }
  getOne(id: string): Promise<ProductResponse | Error> {
    return Promise.resolve(
      MOCK_PRODUCTS.find(p => p.id === id) as ProductResponse,
    );
  }
  create(product: ProductResponse): Promise<ProductResponse | Error> {
    return Promise.resolve(product as ProductResponse);
  }
  update(product: ProductResponse): Promise<ProductResponse | Error> {
    return Promise.resolve(product as ProductResponse);
  }
  delete(): Promise<boolean | Error> {
    return Promise.resolve(true);
  }
}
function createProductMockService() {
  return new ProductMockService();
}

export default createProductMockService();
