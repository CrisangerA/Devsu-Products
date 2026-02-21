import React from 'react';
import { render, screen, fireEvent } from '@test-utils';
import ButtonAddProduct from '@modules/products/ui/components/ProductsList/ButtonAddProduct';

const mockNavigate = jest.fn();
jest.mock('@navigation/hooks/useNavigation', () => ({
  useNavigationProducts: () => ({
    navigate: mockNavigate,
  }),
}));

describe('ButtonAddProduct', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(React.createElement(ButtonAddProduct));
    expect(screen.getByText('Agregar')).toBeTruthy();
  });

  it('contains a button with correct title', () => {
    render(React.createElement(ButtonAddProduct));
    const button = screen.getByText('Agregar');
    expect(button).toBeTruthy();
  });

  it('navigates to Form route when pressed', () => {
    render(React.createElement(ButtonAddProduct));
    const button = screen.getByText('Agregar');
    fireEvent.press(button);
    expect(mockNavigate).toHaveBeenCalledWith('Form');
  });
});
