import React from 'react';
import { render, screen, waitFor } from '@test-utils';
import ProductsListView from '@modules/products/ui/views/ProductsListView';
import productService from '@modules/products/infrastructure/product.service';
import { MOCK_PRODUCTS } from '@modules/products/infrastructure/product-mock.service';

jest.mock('@modules/products/infrastructure/product.service');

describe('ProductsListView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders products list correctly', async () => {
    (productService.getAll as jest.Mock).mockResolvedValue(MOCK_PRODUCTS);

    render(<ProductsListView />);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeTruthy();
      expect(screen.getByText('Product 2')).toBeTruthy();
    });
  });

  it('renders loading state', () => {
    (productService.getAll as jest.Mock).mockReturnValue(new Promise(() => {}));

    render(<ProductsListView />);
    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('renders error state', async () => {
    (productService.getAll as jest.Mock).mockResolvedValue(
      new Error('Failed to fetch'),
    );

    render(<ProductsListView />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch')).toBeTruthy();
    });
  });
});
