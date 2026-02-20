import { Product } from '@modules/products/domain/product.model';

export const ProductsRoutes = {
  Home: 'Home',
  Form: 'Form',
  Detail: 'Detail',
} as const;

export type ProductsRoutes =
  (typeof ProductsRoutes)[keyof typeof ProductsRoutes];

export type ProductsStackParamsList = {
  [ProductsRoutes.Home]: undefined;
  [ProductsRoutes.Form]: { product?: Product };
  [ProductsRoutes.Detail]: { product: Product };
};
