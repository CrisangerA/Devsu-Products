import React from 'react';
import { render, screen } from '@test-utils';
import ButtonAddProduct from '@modules/products/ui/components/ButtonAddProduct';

describe('ButtonAddProduct', () => {
  it('renders correctly', () => {
    render(React.createElement(ButtonAddProduct));
    expect(screen.getByText('Agregar')).toBeTruthy();
  });

  it('contains a button with correct title', () => {
    render(React.createElement(ButtonAddProduct));
    const button = screen.getByText('Agregar');
    expect(button).toBeTruthy();
  });
});
