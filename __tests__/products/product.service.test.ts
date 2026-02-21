import productService from '@modules/products/infrastructure/product.service';
import axiosService from '@modules/network/infrastructure/axios.service';
import { MOCK_PRODUCTS } from '@modules/products/infrastructure/product-mock.service';
jest.mock('@modules/network/infrastructure/axios.service');
jest.mock('@modules/network/domain/network.utils', () => ({
  simulateNetworkRequest: jest.fn().mockResolvedValue(undefined),
}));

const mockProduct = MOCK_PRODUCTS[0];

const mockApiResponse = {
  data: {
    data: mockProduct,
  },
};

describe('ProductService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('returns products on success', async () => {
      (axiosService.get as jest.Mock).mockResolvedValue({
        data: { data: MOCK_PRODUCTS },
      });

      const result = await productService.getAll();
      expect(result).toEqual(MOCK_PRODUCTS);
    });

    it('returns error on failure', async () => {
      (axiosService.get as jest.Mock).mockRejectedValue(
        new Error('Network error'),
      );

      const result = await productService.getAll();
      expect(result).toBeInstanceOf(Error);
    });
  });

  describe('getOne', () => {
    it('returns product by id', async () => {
      (axiosService.get as jest.Mock).mockResolvedValue({
        data: mockProduct,
      });

      const result = await productService.getOne('1');
      expect(result).toEqual(mockProduct);
    });
  });

  describe('create', () => {
    it('creates a product', async () => {
      (axiosService.post as jest.Mock).mockResolvedValue(mockApiResponse);

      const result = await productService.create(mockProduct);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('update', () => {
    it('updates a product', async () => {
      (axiosService.put as jest.Mock).mockResolvedValue(mockApiResponse);

      const result = await productService.update(mockProduct);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('delete', () => {
    it('deletes a product', async () => {
      (axiosService.delete as jest.Mock).mockResolvedValue({ data: {} });

      const result = await productService.delete('1');
      expect(result).toBe(true);
    });

    it('returns error when delete fails', async () => {
      (axiosService.delete as jest.Mock).mockRejectedValue(
        new Error('Delete failed'),
      );

      const result = await productService.delete('1');
      expect(result).toBeInstanceOf(Error);
    });
  });

  describe('getAll edge cases', () => {
    it('returns error when response has no data', async () => {
      (axiosService.get as jest.Mock).mockResolvedValue({ data: {} });

      const result = await productService.getAll();
      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toBe('No products found');
    });
  });

  describe('getOne edge cases', () => {
    it('returns error when getOne fails', async () => {
      (axiosService.get as jest.Mock).mockRejectedValue(
        new Error('Network error'),
      );

      const result = await productService.getOne('1');
      expect(result).toBeInstanceOf(Error);
    });
  });

  describe('create edge cases', () => {
    it('returns error when response has no data', async () => {
      (axiosService.post as jest.Mock).mockResolvedValue({ data: {} });

      const result = await productService.create(mockProduct);
      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toBe('Product not created');
    });

    it('returns error when create fails', async () => {
      (axiosService.post as jest.Mock).mockRejectedValue(
        new Error('Create failed'),
      );

      const result = await productService.create(mockProduct);
      expect(result).toBeInstanceOf(Error);
    });
  });

  describe('update edge cases', () => {
    it('returns error when update fails', async () => {
      (axiosService.put as jest.Mock).mockRejectedValue(
        new Error('Update failed'),
      );

      const result = await productService.update(mockProduct);
      expect(result).toBeInstanceOf(Error);
    });
  });
});
