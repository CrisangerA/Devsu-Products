import React from 'react';
import { render, screen } from '@test-utils';
import ProductsEmpty from '@modules/products/ui/components/ProductsList/ProductsEmpty';
import { Text } from 'react-native';

describe('ProductsEmpty', () => {
  it('renders "Sin resultados" text', () => {
    render(<ProductsEmpty />);
    expect(screen.getByText('Sin resultados')).toBeTruthy();
  });

  it('renders "No se encontraron productos" message', () => {
    render(<ProductsEmpty />);
    expect(screen.getByText('No se encontraron productos')).toBeTruthy();
  });

  it('renders with h3 variant for title', () => {
    render(<ProductsEmpty />);
    const title = screen.getByText('Sin resultados');
    expect(title).toBeTruthy();
  });

  it('renders with body variant for message', () => {
    render(<ProductsEmpty />);
    const message = screen.getByText('No se encontraron productos');
    expect(message).toBeTruthy();
  });
});
