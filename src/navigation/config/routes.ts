export const ProductsRoutes = {
  Home: 'Home',
  Form: 'Form',
} as const;

export type ProductsRoutes = (typeof ProductsRoutes)[keyof typeof ProductsRoutes];

export type ProductsStackParamsList = {
  [ProductsRoutes.Home]: undefined;
  [ProductsRoutes.Form]: undefined;
};
