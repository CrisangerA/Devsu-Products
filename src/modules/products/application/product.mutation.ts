import { useMutation, useQueryClient } from '@tanstack/react-query';
import productService from '../infrastructure/product.service';
import { ProductResponse } from '../domain/product.model';
import { QUERY_KEYS } from '@config/query.keys';

export function useProductMutationCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: ProductResponse) => {
      const result = await productService.create(product);
      if (result instanceof Error) {
        throw result;
      }

      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS });
      return result;
    },
  });
}

export function useProductMutationUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: ProductResponse) => {
      const result = await productService.update(product);
      if (result instanceof Error) {
        throw result;
      }

      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS });
      return result;
    },
  });
}

export function useProductMutationDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const result = await productService.delete(id);
      if (result instanceof Error) {
        throw result;
      }

      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCTS });
      return result;
    },
  });
}
