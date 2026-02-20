import axiosService from '@modules/network/infrastructure/axios.service';
import { ProductResponse } from '../domain/product.model';
import { ProductRepository } from '../domain/product.repository';
import { API_ROUTES } from '@config/api.routes';
import { manageAxiosError } from '@modules/network/domain/network.error';
import { ApiResponse } from '@modules/network/domain/network.model';
import { simulateNetworkRequest } from '@modules/network/domain/network.utils';

class ProductService implements ProductRepository {
  async getAll() {
    try {
      await simulateNetworkRequest();
      const result = await axiosService.get<ApiResponse<ProductResponse[]>>(
        API_ROUTES.PRODUCTS,
      );
      if (result.data.data) {
        return result.data.data;
      }
      return new Error('No products found');
    } catch (error) {
      return manageAxiosError(error);
    }
  }

  async getOne(id: string) {
    try {
      await simulateNetworkRequest();
      const result = await axiosService.get<ProductResponse>(
        `${API_ROUTES.PRODUCTS}/${id}`,
      );
      return result.data;
    } catch (error) {
      return manageAxiosError(error);
    }
  }

  async create(product: ProductResponse) {
    try {
      await simulateNetworkRequest();
      const result = await axiosService.post<ApiResponse<ProductResponse>>(
        API_ROUTES.PRODUCTS,
        product,
      );
      if (result.data.data) {
        return result.data.data;
      }
      return new Error('Product not created');
    } catch (error) {
      return manageAxiosError(error);
    }
  }

  async update(product: ProductResponse) {
    try {
      await simulateNetworkRequest();
      const result = await axiosService.put<ApiResponse<ProductResponse>>(
        `${API_ROUTES.PRODUCTS}/${product.id}`,
        product,
      );
      return result.data.data as ProductResponse;
    } catch (error) {
      return manageAxiosError(error);
    }
  }

  async delete(id: string) {
    try {
      await simulateNetworkRequest();
      await axiosService.delete<ApiResponse<ProductResponse>>(
        `${API_ROUTES.PRODUCTS}/${id}`,
      );
      return true;
    } catch (error) {
      return manageAxiosError(error);
    }
  }
}

function createProductService(): ProductRepository {
  return new ProductService();
}

export default createProductService();
