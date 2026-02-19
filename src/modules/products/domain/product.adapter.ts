import { Product, ProductResponse } from './product.model';

export function productResponseAdapter(product: ProductResponse): Product {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    logo: product.logo,
    releaseDate: product.date_release,
    revisionDate: product.date_revision,
  };
}

export function productsResponseAdapter(
  productEntities: ProductResponse[],
): Product[] {
  return productEntities.map(productResponseAdapter);
}
