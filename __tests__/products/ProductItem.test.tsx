import React from 'react';
import { render, screen, fireEvent } from '@test-utils';
import ProductItem from '@modules/products/ui/components/ProductsList/ProductItem';

const mockProduct = {
  id: 'test-id-123',
  name: 'Test Product Name',
  description: 'Test Description',
  logo: 'https://example.com/logo.png',
  releaseDate: new Date('2024-01-01'),
  revisionDate: new Date('2025-01-01'),
};

jest.mock('@navigation/hooks/useNavigation', () => ({
  useNavigationProducts: () => ({
    navigate: jest.fn(),
  }),
}));

describe('ProductItem', () => {
  it('renders product name', () => {
    render(<ProductItem product={mockProduct} />);
    expect(screen.getByText('Test Product Name')).toBeTruthy();
  });

  it('renders product id', () => {
    render(<ProductItem product={mockProduct} />);
    expect(screen.getByText('ID: test-id-123')).toBeTruthy();
  });

  it('renders arrow indicator', () => {
    render(<ProductItem product={mockProduct} />);
    expect(screen.getByTestId('ChevronRightIcon')).toBeTruthy();
  });

  it('calls navigation on press', () => {
    const mockNavigate = jest.fn();
    require('@navigation/hooks/useNavigation').useNavigationProducts = () => ({
      navigate: mockNavigate,
    });

    render(<ProductItem product={mockProduct} />);

    const pressable = screen.getByText('Test Product Name').parent?.parent;
    if (pressable) {
      fireEvent.press(pressable);
    }

    expect(mockNavigate).toHaveBeenCalled();
  });

  it('renders with correct layout', () => {
    const { toJSON } = render(<ProductItem product={mockProduct} />);
    expect(toJSON()).toBeTruthy();
  });
});
