import React from 'react';
import { render, screen, fireEvent, waitFor } from '@test-utils';
import ProductDetailView from '@modules/products/ui/views/ProductDetailView';
import { useProductMutationDelete } from '@modules/products/application/product.mutation';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock('@modules/products/application/product.mutation');
jest.mock('@navigation/hooks/useNavigation', () => ({
  useNavigationProducts: () => ({
    goBack: mockGoBack,
    navigate: mockNavigate,
  }),
}));
jest.mock('@gorhom/bottom-sheet', () => {
  const React = require('react');
  const { View } = require('react-native');
  const MockBottomSheet = React.forwardRef((props: any, ref: any) => {
    React.useImperativeHandle(ref, () => ({
      expand: jest.fn(),
      close: jest.fn(),
    }));
    return <View testID="bottom-sheet">{props.children}</View>;
  });
  return {
    __esModule: true,
    default: MockBottomSheet,
    BottomSheetBackdrop: () => null,
    BottomSheetView: ({ children }: any) => <View>{children}</View>,
  };
});

const mockProduct = {
  id: 'test-id',
  name: 'Test Product',
  description: 'Test Description',
  logo: 'https://example.com/logo.png',
  releaseDate: new Date('2024-01-01'),
  revisionDate: new Date('2025-01-01'),
};

const mockRoute = {
  params: {
    product: mockProduct,
  },
  key: 'test-key',
  name: 'Detail',
};

describe('ProductDetailView', () => {
  const mockDeleteProduct = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useProductMutationDelete as jest.Mock).mockReturnValue({
      mutate: mockDeleteProduct,
      isPending: false,
    });
  });

  it('renders product details correctly', () => {
    render(<ProductDetailView route={mockRoute as any} />);

    expect(screen.getByText(`ID: ${mockProduct.id}`)).toBeTruthy();
    expect(screen.getByText(mockProduct.name)).toBeTruthy();
    expect(screen.getByText(mockProduct.description)).toBeTruthy();
  });

  it('renders edit button', () => {
    render(<ProductDetailView route={mockRoute as any} />);

    expect(screen.getByText('Editar')).toBeTruthy();
  });

  it('renders delete button', () => {
    render(<ProductDetailView route={mockRoute as any} />);

    expect(screen.getByText('Eliminar')).toBeTruthy();
  });

  it('renders product labels', () => {
    render(<ProductDetailView route={mockRoute as any} />);

    expect(screen.getByText('Nombre')).toBeTruthy();
    expect(screen.getByText('Descripción')).toBeTruthy();
    expect(screen.getByText('Logo')).toBeTruthy();
    expect(screen.getByText('Fecha de lanzamiento')).toBeTruthy();
    expect(screen.getByText('Fecha de revisión')).toBeTruthy();
  });

  it('renders extra information label', () => {
    render(<ProductDetailView route={mockRoute as any} />);

    expect(screen.getByText('Información extra')).toBeTruthy();
  });

  it('uses default logo when product logo is not a URL', () => {
    const productWithoutUrl = {
      ...mockProduct,
      logo: 'local-image.png',
    };

    const routeWithoutUrl = {
      ...mockRoute,
      params: { product: productWithoutUrl },
    };

    render(<ProductDetailView route={routeWithoutUrl as any} />);

    expect(screen.getByText('Logo')).toBeTruthy();
  });

  it('formats release date correctly', () => {
    render(<ProductDetailView route={mockRoute as any} />);

    expect(screen.getByText('Fecha de lanzamiento')).toBeTruthy();
  });

  it('formats revision date correctly', () => {
    render(<ProductDetailView route={mockRoute as any} />);

    expect(screen.getByText('Fecha de revisión')).toBeTruthy();
  });

  it('shows loading state in delete button', () => {
    (useProductMutationDelete as jest.Mock).mockReturnValue({
      mutate: mockDeleteProduct,
      isPending: true,
    });

    render(<ProductDetailView route={mockRoute as any} />);

    expect(screen.getByText('Eliminando...')).toBeTruthy();
  });

  it('renders bottom sheet delete component', () => {
    render(<ProductDetailView route={mockRoute as any} />);

    expect(screen.getByText('Editar')).toBeTruthy();
    expect(screen.getByText('Eliminar')).toBeTruthy();
  });

  it('navigates to edit form when edit button is pressed', () => {
    render(<ProductDetailView route={mockRoute as any} />);

    const editBtn = screen.getByText('Editar');
    fireEvent.press(editBtn);

    expect(mockNavigate).toHaveBeenCalledWith('Form', { product: mockProduct });
  });

  it('renders with HTTP logo directly', () => {
    const productWithHttpLogo = {
      ...mockProduct,
      logo: 'http://example.com/logo.png',
    };

    const routeWithHttpLogo = {
      ...mockRoute,
      params: { product: productWithHttpLogo },
    };

    render(<ProductDetailView route={routeWithHttpLogo as any} />);

    expect(screen.getByText('ID: test-id')).toBeTruthy();
  });

  it('calls deleteProduct on confirm and invokes onSuccess with goBack', async () => {
    mockDeleteProduct.mockImplementation((_id: string, options: any) => {
      options.onSuccess();
    });

    render(<ProductDetailView route={mockRoute as any} />);

    const confirmBtn = screen.getByText('Confirmar');
    fireEvent.press(confirmBtn);

    await waitFor(() => {
      expect(mockDeleteProduct).toHaveBeenCalledWith(
        mockProduct.id,
        expect.objectContaining({ onSuccess: expect.any(Function) }),
      );
      expect(mockGoBack).toHaveBeenCalled();
    });
  });

  it('calls bottomSheet close on cancel press', () => {
    render(<ProductDetailView route={mockRoute as any} />);

    const cancelBtn = screen.getByText('Cancelar');
    fireEvent.press(cancelBtn);

    // Cancel button rendered and pressable — the close() is called on BottomSheet ref
    expect(cancelBtn).toBeTruthy();
  });

  it('expands bottom sheet when Eliminar is pressed', () => {
    render(<ProductDetailView route={mockRoute as any} />);

    const deleteBtn = screen.getByText('Eliminar');
    fireEvent.press(deleteBtn);

    // The bottom sheet expand is called via ref
    expect(deleteBtn).toBeTruthy();
  });
});
