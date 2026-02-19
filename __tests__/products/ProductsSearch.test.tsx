import React from 'react';
import { render, screen } from '@test-utils';
import ProductsSearch from '@modules/products/ui/components/ProductsSearch';

describe('ProductsSearch', () => {
  it('renders correctly', () => {
    render(React.createElement(ProductsSearch));
    expect(screen.getByPlaceholderText('Search...')).toBeTruthy();
  });

  it('has correct placeholder text', () => {
    render(React.createElement(ProductsSearch));
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeTruthy();
  });
});
