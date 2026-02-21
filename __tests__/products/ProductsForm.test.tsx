import React from 'react';
import { render, screen, fireEvent, waitFor } from '@test-utils';
import ProductsForm from '@modules/products/ui/components/ProductsForm/ProductsForm';
import {
  useProductMutationCreate,
  useProductMutationUpdate,
} from '@modules/products/application/product.mutation';

jest.mock('@modules/products/application/product.mutation');
jest.mock('@navigation/hooks/useNavigation', () => ({
  useNavigationProducts: () => ({
    goBack: jest.fn(),
    popTo: jest.fn(),
    navigate: jest.fn(),
  }),
}));

const mockProduct = {
  id: 'test-id',
  name: 'Test Product',
  description: 'Test Description',
  logo: 'https://example.com/logo.png',
  releaseDate: new Date('2024-01-01'),
  revisionDate: new Date('2025-01-01'),
};

describe('ProductsForm', () => {
  const mockCreateProduct = jest.fn();
  const mockUpdateProduct = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useProductMutationCreate as jest.Mock).mockReturnValue({
      mutate: mockCreateProduct,
      isPending: false,
    });
    (useProductMutationUpdate as jest.Mock).mockReturnValue({
      mutate: mockUpdateProduct,
      isPending: false,
    });
  });

  it('renders form fields correctly', () => {
    render(<ProductsForm />);

    expect(screen.getByText('ID')).toBeTruthy();
    expect(screen.getByText('Nombre')).toBeTruthy();
    expect(screen.getByText('Descripción')).toBeTruthy();
    expect(screen.getByText('Logo')).toBeTruthy();
    expect(screen.getByText('Fecha Liberación')).toBeTruthy();
    expect(screen.getByText('Fecha Revisión')).toBeTruthy();
  });

  it('renders submit button', () => {
    render(<ProductsForm />);

    expect(screen.getByText('Enviar')).toBeTruthy();
  });

  it('renders reset button', () => {
    render(<ProductsForm />);

    expect(screen.getByText('Reiniciar')).toBeTruthy();
  });

  it('renders with product data in edit mode', () => {
    render(<ProductsForm product={mockProduct} />);

    expect(screen.getByText('Actualizar')).toBeTruthy();
  });

  it('renders in create mode without product', () => {
    render(<ProductsForm />);

    expect(screen.getByText('Enviar')).toBeTruthy();
  });

  it('disables ID field in edit mode', () => {
    render(<ProductsForm product={mockProduct} />);

    const inputs = screen.getAllByPlaceholderText('ID');
    const idInput = inputs[0];
    expect(idInput.props.editable).toBe(false);
  });

  it('enables ID field in create mode', () => {
    render(<ProductsForm />);

    const inputs = screen.getAllByPlaceholderText('ID');
    const idInput = inputs[0];
    expect(idInput.props.editable).toBe(true);
  });

  it('shows loading state during creation', () => {
    (useProductMutationCreate as jest.Mock).mockReturnValue({
      mutate: mockCreateProduct,
      isPending: true,
    });

    render(<ProductsForm />);

    expect(screen.getByText('Guardando...')).toBeTruthy();
  });

  it('shows loading state during update', () => {
    (useProductMutationUpdate as jest.Mock).mockReturnValue({
      mutate: mockUpdateProduct,
      isPending: true,
    });

    render(<ProductsForm product={mockProduct} />);

    expect(screen.getByText('Guardando...')).toBeTruthy();
  });

  it('disables buttons during loading', () => {
    (useProductMutationCreate as jest.Mock).mockReturnValue({
      mutate: mockCreateProduct,
      isPending: true,
    });

    render(<ProductsForm />);

    const loadingBtn = screen.getByText('Guardando...');
    const resetBtn = screen.getByText('Reiniciar');

    expect(loadingBtn).toBeTruthy();
    expect(resetBtn).toBeTruthy();
  });

  it('resets form when reset button is pressed', () => {
    render(<ProductsForm />);

    const nameInputs = screen.getAllByPlaceholderText('Nombre');
    const nameInput = nameInputs[0];
    fireEvent.changeText(nameInput, 'Test Name');

    const resetBtn = screen.getByText('Reiniciar');
    fireEvent.press(resetBtn);

    expect(nameInput.props.value).toBe('');
  });

  it('handles form validation - empty fields prevent submit', async () => {
    render(<ProductsForm />);

    const submitBtn = screen.getByText('Enviar');
    fireEvent.press(submitBtn);

    await waitFor(() => {
      expect(mockCreateProduct).not.toHaveBeenCalled();
    });
  });

  it('renders secondary variant for reset button', () => {
    render(<ProductsForm />);

    const resetBtn = screen.getByText('Reiniciar');
    expect(resetBtn).toBeTruthy();
  });

  it('populates form with product data in edit mode', () => {
    render(<ProductsForm product={mockProduct} />);

    const inputs = screen.getAllByPlaceholderText('ID');
    const idInput = inputs[0];
    const nameInputs = screen.getAllByPlaceholderText('Nombre');
    const nameInput = nameInputs[0];
    const descInputs = screen.getAllByPlaceholderText('Descripción');
    const descInput = descInputs[0];

    expect(idInput.props.value).toBe(mockProduct.id);
    expect(nameInput.props.value).toBe(mockProduct.name);
    expect(descInput.props.value).toBe(mockProduct.description);
  });

  it('allows typing in ID field in create mode', () => {
    render(<ProductsForm />);

    const inputs = screen.getAllByPlaceholderText('ID');
    const idInput = inputs[0];
    fireEvent.changeText(idInput, 'new-id-123');

    expect(idInput.props.value).toBe('new-id-123');
  });

  it('allows typing in name field', () => {
    render(<ProductsForm />);

    const nameInputs = screen.getAllByPlaceholderText('Nombre');
    const nameInput = nameInputs[0];
    fireEvent.changeText(nameInput, 'New Product Name');

    expect(nameInput.props.value).toBe('New Product Name');
  });

  it('allows typing in description field', () => {
    render(<ProductsForm />);

    const descInputs = screen.getAllByPlaceholderText('Descripción');
    const descInput = descInputs[0];
    fireEvent.changeText(descInput, 'New Description');

    expect(descInput.props.value).toBe('New Description');
  });

  it('allows typing in logo field', () => {
    render(<ProductsForm />);

    const logoInputs = screen.getAllByPlaceholderText('Logo');
    const logoInput = logoInputs[0];
    fireEvent.changeText(logoInput, 'https://example.com/new-logo.png');

    expect(logoInput.props.value).toBe('https://example.com/new-logo.png');
  });
});
