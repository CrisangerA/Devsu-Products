import { useQuery } from '@tanstack/react-query';
import productService from '../infrastructure/product.service';
import { QUERY_KEYS } from '@config/query.keys';
import { productsResponseAdapter } from '../domain/product.adapter';

export function useProductsQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.PRODUCTS,
    queryFn: async () => {
      const response = await productService.getAll();

      if (response instanceof Error) {
        throw response;
      }

      const products = productsResponseAdapter(response);
      return products;
    },
  });
}
