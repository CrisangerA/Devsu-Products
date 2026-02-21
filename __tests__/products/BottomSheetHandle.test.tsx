import React from 'react';
import { render, screen, fireEvent } from '@test-utils';
import BottomSheetHandle from '@modules/products/ui/components/ProductDetail/BottomSheetHandle';

describe('BottomSheetHandle', () => {
  it('renders close icon', () => {
    const onPress = jest.fn();
    render(<BottomSheetHandle onPress={onPress} />);
    expect(screen.getByTestId('CloseIcon')).toBeTruthy();
  });

  it('calls onPress when button is pressed', () => {
    const onPress = jest.fn();
    render(<BottomSheetHandle onPress={onPress} />);
    const button = screen.getByLabelText('Cerrar');
    fireEvent.press(button);
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
