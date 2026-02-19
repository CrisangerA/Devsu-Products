import { renderHook, waitFor } from '@testing-library/react-native';
import { useProductsQuery } from '@modules/products/application/product.queries';
import productService from '@modules/products/infrastructure/product.service';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

jest.mock('@modules/products/infrastructure/product.service');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
  return Wrapper;
};

describe('product.queries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useProductsQuery', () => {
    it('returns data successfully', async () => {
      const mockData = [
        {
          id: '1',
          name: 'Product 1',
          description: 'Desc 1',
          logo: 'logo1.png',
          date_release: new Date('2024-01-01'),
          date_revision: new Date('2025-01-01'),
        },
      ];

      (productService.getAll as jest.Mock).mockResolvedValue(mockData);

      const { result } = renderHook(() => useProductsQuery(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toHaveLength(1);
      expect(result.current.data?.[0].id).toBe('1');
    });

    it('throws error when service returns Error', async () => {
      const error = new Error('Network error');
      (productService.getAll as jest.Mock).mockResolvedValue(error);

      const { result } = renderHook(() => useProductsQuery(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toBeInstanceOf(Error);
    });

    it('returns loading state initially', async () => {
      (productService.getAll as jest.Mock).mockImplementation(
        () => new Promise(() => {}),
      );

      const { result } = renderHook(() => useProductsQuery(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(true);
    });

    it('adapts product response correctly', async () => {
      const mockData = [
        {
          id: 'test-id',
          name: 'Test Product',
          description: 'Test Description',
          logo: 'test-logo.png',
          date_release: new Date('2024-06-01'),
          date_revision: new Date('2025-06-01'),
        },
      ];

      (productService.getAll as jest.Mock).mockResolvedValue(mockData);

      const { result } = renderHook(() => useProductsQuery(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      const product = result.current.data?.[0];
      expect(product?.releaseDate).toBeInstanceOf(Date);
      expect(product?.revisionDate).toBeInstanceOf(Date);
    });
  });
});
