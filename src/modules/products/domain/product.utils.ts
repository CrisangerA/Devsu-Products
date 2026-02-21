import { Product } from './product.model';

export function filterProducts(searchQuery: string, data: Product[]) {
  if (!searchQuery.trim()) return data;
  const query = searchQuery.toLowerCase().trim();
  return data.filter(
    product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.id.toLowerCase().includes(query),
  );
}
