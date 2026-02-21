import { renderHook, waitFor, act } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import {
  useProductMutationCreate,
  useProductMutationUpdate,
  useProductMutationDelete,
} from '@modules/products/application/product.mutation';
import productService from '@modules/products/infrastructure/product.service';

jest.mock('@modules/products/infrastructure/product.service');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
  return Wrapper;
};

const mockProduct = {
  id: 'test-id',
  name: 'Test Product',
  description: 'Test Description',
  logo: 'https://example.com/logo.png',
  date_release: new Date('2024-01-01'),
  date_revision: new Date('2025-01-01'),
};

describe('product.mutation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useProductMutationCreate', () => {
    it('creates a product successfully', async () => {
      (productService.create as jest.Mock).mockResolvedValue(mockProduct);

      const { result } = renderHook(() => useProductMutationCreate(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.mutate(mockProduct);
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockProduct);
      expect(productService.create).toHaveBeenCalledWith(mockProduct);
    });

    it('throws error when create fails', async () => {
      const error = new Error('Create failed');
      (productService.create as jest.Mock).mockResolvedValue(error);

      const { result } = renderHook(() => useProductMutationCreate(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.mutate(mockProduct);
      });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toBeInstanceOf(Error);
    });

    it('invalidates queries on success', async () => {
      const invalidateSpy = jest.fn();
      (productService.create as jest.Mock).mockResolvedValue(mockProduct);

      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { retry: false },
          mutations: { retry: false },
        },
      });
      queryClient.invalidateQueries = invalidateSpy;

      const Wrapper = ({ children }: { children: React.ReactNode }) =>
        React.createElement(
          QueryClientProvider,
          { client: queryClient },
          children,
        );

      const { result } = renderHook(() => useProductMutationCreate(), {
        wrapper: Wrapper,
      });

      act(() => {
        result.current.mutate(mockProduct);
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: ['products'],
      });
    });
  });

  describe('useProductMutationUpdate', () => {
    it('updates a product successfully', async () => {
      const updatedProduct = { ...mockProduct, name: 'Updated Product' };
      (productService.update as jest.Mock).mockResolvedValue(updatedProduct);

      const { result } = renderHook(() => useProductMutationUpdate(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.mutate(updatedProduct);
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(updatedProduct);
      expect(productService.update).toHaveBeenCalledWith(updatedProduct);
    });

    it('throws error when update fails', async () => {
      const error = new Error('Update failed');
      (productService.update as jest.Mock).mockResolvedValue(error);

      const { result } = renderHook(() => useProductMutationUpdate(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.mutate(mockProduct);
      });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toBeInstanceOf(Error);
    });

    it('invalidates queries on success', async () => {
      const invalidateSpy = jest.fn();
      (productService.update as jest.Mock).mockResolvedValue(mockProduct);

      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { retry: false },
          mutations: { retry: false },
        },
      });
      queryClient.invalidateQueries = invalidateSpy;

      const Wrapper = ({ children }: { children: React.ReactNode }) =>
        React.createElement(
          QueryClientProvider,
          { client: queryClient },
          children,
        );

      const { result } = renderHook(() => useProductMutationUpdate(), {
        wrapper: Wrapper,
      });

      act(() => {
        result.current.mutate(mockProduct);
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: ['products'],
      });
    });
  });

  describe('useProductMutationDelete', () => {
    it('deletes a product successfully', async () => {
      (productService.delete as jest.Mock).mockResolvedValue(undefined);

      const { result } = renderHook(() => useProductMutationDelete(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.mutate('test-id');
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(productService.delete).toHaveBeenCalledWith('test-id');
    });

    it('throws error when delete fails', async () => {
      const error = new Error('Delete failed');
      (productService.delete as jest.Mock).mockResolvedValue(error);

      const { result } = renderHook(() => useProductMutationDelete(), {
        wrapper: createWrapper(),
      });

      act(() => {
        result.current.mutate('test-id');
      });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toBeInstanceOf(Error);
    });

    it('invalidates queries on success', async () => {
      const invalidateSpy = jest.fn();
      (productService.delete as jest.Mock).mockResolvedValue(undefined);

      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { retry: false },
          mutations: { retry: false },
        },
      });
      queryClient.invalidateQueries = invalidateSpy;

      const Wrapper = ({ children }: { children: React.ReactNode }) =>
        React.createElement(
          QueryClientProvider,
          { client: queryClient },
          children,
        );

      const { result } = renderHook(() => useProductMutationDelete(), {
        wrapper: Wrapper,
      });

      act(() => {
        result.current.mutate('test-id');
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: ['products'],
      });
    });
  });
});
