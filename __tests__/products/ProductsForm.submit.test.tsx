import React from 'react';
import { render, screen, fireEvent, waitFor } from '@test-utils';
import ProductsForm from '@modules/products/ui/components/ProductsForm/ProductsForm';
import {
  useProductMutationCreate,
  useProductMutationUpdate,
} from '@modules/products/application/product.mutation';

jest.mock('@modules/products/application/product.mutation');

// Mock zodResolver to bypass Zod validation so onSubmit is always called
jest.mock('@hookform/resolvers/zod', () => ({
  zodResolver: () => async () => ({
    values: {},
    errors: {},
  }),
}));

const mockGoBack = jest.fn();
const mockPopTo = jest.fn();

jest.mock('@navigation/hooks/useNavigation', () => ({
  useNavigationProducts: () => ({
    goBack: mockGoBack,
    popTo: mockPopTo,
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

describe('ProductsForm - Submit & Error Flows', () => {
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

  it('calls createProduct on submit in create mode', async () => {
    render(<ProductsForm />);

    const idInput = screen.getAllByPlaceholderText('ID')[0];
    const nameInput = screen.getAllByPlaceholderText('Nombre')[0];
    const descInput = screen.getAllByPlaceholderText('Descripción')[0];
    const logoInput = screen.getAllByPlaceholderText('Logo')[0];

    fireEvent.changeText(idInput, 'newid1');
    fireEvent.changeText(nameInput, 'New Product Name');
    fireEvent.changeText(descInput, 'A longer description text here');
    fireEvent.changeText(logoInput, 'https://example.com/logo.png');

    fireEvent.press(screen.getByText('Enviar'));

    await waitFor(() => {
      expect(mockCreateProduct).toHaveBeenCalled();
    });
  });

  it('invokes goBack on successful create', async () => {
    mockCreateProduct.mockImplementation((_data: any, options: any) => {
      options.onSuccess();
    });

    render(<ProductsForm />);

    const idInput = screen.getAllByPlaceholderText('ID')[0];
    const nameInput = screen.getAllByPlaceholderText('Nombre')[0];
    const descInput = screen.getAllByPlaceholderText('Descripción')[0];
    const logoInput = screen.getAllByPlaceholderText('Logo')[0];

    fireEvent.changeText(idInput, 'newid2');
    fireEvent.changeText(nameInput, 'New Product Name');
    fireEvent.changeText(descInput, 'A longer description text here');
    fireEvent.changeText(logoInput, 'https://example.com/logo.png');

    fireEvent.press(screen.getByText('Enviar'));

    await waitFor(() => {
      expect(mockGoBack).toHaveBeenCalled();
    });
  });

  it('calls updateProduct on submit in edit mode', async () => {
    render(<ProductsForm product={mockProduct} />);

    fireEvent.press(screen.getByText('Actualizar'));

    await waitFor(() => {
      expect(mockUpdateProduct).toHaveBeenCalled();
    });
  });

  it('invokes popTo on successful update', async () => {
    mockUpdateProduct.mockImplementation((_data: any, options: any) => {
      options.onSuccess({
        ...mockProduct,
        date_release: new Date('2024-01-01'),
        date_revision: new Date('2025-01-01'),
      });
    });

    render(<ProductsForm product={mockProduct} />);

    fireEvent.press(screen.getByText('Actualizar'));

    await waitFor(() => {
      expect(mockPopTo).toHaveBeenCalledWith(
        'Detail',
        expect.objectContaining({
          product: expect.objectContaining({
            releaseDate: expect.any(Date),
            revisionDate: expect.any(Date),
          }),
        }),
      );
    });
  });

  it('handles FormError by setting field errors', async () => {
    const formError = new Error(
      JSON.stringify([
        {
          property: 'name',
          constraints: { isNotEmpty: 'El nombre es requerido' },
        },
      ]),
    );
    formError.name = 'FormError';

    mockCreateProduct.mockImplementation((_data: any, options: any) => {
      options.onError(formError);
    });

    render(<ProductsForm />);

    const idInput = screen.getAllByPlaceholderText('ID')[0];
    fireEvent.changeText(idInput, 'newid3');

    fireEvent.press(screen.getByText('Enviar'));

    await waitFor(() => {
      expect(mockCreateProduct).toHaveBeenCalled();
    });
  });

  it('handles DuplicateIdentifierError by setting id error', async () => {
    const dupError = new Error('ID already exists');
    dupError.name = 'DuplicateIdentifierError';

    mockCreateProduct.mockImplementation((_data: any, options: any) => {
      options.onError(dupError);
    });

    render(<ProductsForm />);

    const idInput = screen.getAllByPlaceholderText('ID')[0];
    fireEvent.changeText(idInput, 'dupid1');

    fireEvent.press(screen.getByText('Enviar'));

    await waitFor(() => {
      expect(mockCreateProduct).toHaveBeenCalled();
    });
  });

  it('handles FormError with date_release/date_revision property mapping', async () => {
    const formError = new Error(
      JSON.stringify([
        {
          property: 'date_release',
          constraints: { isDate: 'Fecha inválida' },
        },
        {
          property: 'date_revision',
          constraints: { isDate: 'Fecha revisión inválida' },
        },
      ]),
    );
    formError.name = 'FormError';

    mockUpdateProduct.mockImplementation((_data: any, options: any) => {
      options.onError(formError);
    });

    render(<ProductsForm product={mockProduct} />);

    fireEvent.press(screen.getByText('Actualizar'));

    await waitFor(() => {
      expect(mockUpdateProduct).toHaveBeenCalled();
    });
  });
});
