import { ProductResponse } from './product.model';

export interface ProductRepository {
  getAll(): Promise<ProductResponse[] | Error>;
  getOne(id: string): Promise<ProductResponse | Error>;
  create(product: ProductResponse): Promise<ProductResponse | Error>;
  update(product: ProductResponse): Promise<ProductResponse | Error>;
  delete(id: string): Promise<boolean | Error>;
}
