import React from 'react';
import { render, screen } from '@test-utils';
import ProductsFormView from '@modules/products/ui/views/ProductsFormView';

const mockRoute = {
  params: {
    product: {
      id: 'test-id',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'https://example.com/logo.png',
      releaseDate: new Date('2024-01-01'),
      revisionDate: new Date('2025-01-01'),
    },
  },
  key: 'test-key',
  name: 'Form',
};

const mockRouteWithoutProduct = {
  params: {},
  key: 'test-key',
  name: 'Form',
};

describe('ProductsFormView', () => {
  it('renders form title', () => {
    render(<ProductsFormView route={mockRoute as any} />);

    expect(screen.getByText('Formulario de Registro')).toBeTruthy();
  });

  it('renders form when product is provided', () => {
    render(<ProductsFormView route={mockRoute as any} />);

    expect(screen.getByText('ID')).toBeTruthy();
    expect(screen.getByText('Nombre')).toBeTruthy();
  });

  it('renders form when no product is provided', () => {
    render(<ProductsFormView route={mockRouteWithoutProduct as any} />);

    expect(screen.getByText('Formulario de Registro')).toBeTruthy();
  });

  it('renders in scroll view', () => {
    const { toJSON } = render(<ProductsFormView route={mockRoute as any} />);
    expect(toJSON()).toBeTruthy();
  });

  it('passes product to ProductsForm component', () => {
    render(<ProductsFormView route={mockRoute as any} />);

    expect(screen.getByPlaceholderText('ID').props.value).toBe('test-id');
  });
});
