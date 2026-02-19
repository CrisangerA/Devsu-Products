import React from 'react';
import { render, screen, fireEvent } from '@test-utils';
import { Button } from '@components/core/Button';

describe('Button', () => {
  it('renders correctly with title', () => {
    render(<Button title="Click me" />);
    expect(screen.getByText('Click me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(<Button title="Click me" onPress={onPress} />);

    fireEvent.press(screen.getByText('Click me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    render(<Button title="Click me" onPress={onPress} disabled />);

    fireEvent.press(screen.getByText('Click me'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('does not call onPress when loading', () => {
    const onPress = jest.fn();
    render(<Button title="Click me" onPress={onPress} loading />);

    fireEvent.press(screen.getByText('Click me'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders with left icon', () => {
    render(
      <Button
        title="With Icon"
        leftIcon={React.createElement('View', { testID: 'left-icon' })}
      />,
    );
    expect(screen.getByText('With Icon')).toBeTruthy();
  });

  it('renders with right icon', () => {
    render(
      <Button
        title="With Icon"
        rightIcon={React.createElement('View', { testID: 'right-icon' })}
      />,
    );
    expect(screen.getByText('With Icon')).toBeTruthy();
  });

  it('shows loading indicator when loading', () => {
    render(<Button title="Loading" loading />);
    expect(screen.getByText('Loading')).toBeTruthy();
  });

  it('applies different variants', () => {
    const variants = ['primary', 'secondary', 'outlined', 'ghost'] as const;

    variants.forEach(variant => {
      const { unmount } = render(<Button title="Test" variant={variant} />);
      expect(screen.getByText('Test')).toBeTruthy();
      unmount();
    });
  });

  it('applies different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach(size => {
      const { unmount } = render(<Button title="Test" size={size} />);
      expect(screen.getByText('Test')).toBeTruthy();
      unmount();
    });
  });

  it('applies fullWidth style', () => {
    render(<Button title="Full Width" fullWidth />);
    expect(screen.getByText('Full Width')).toBeTruthy();
  });

  it('renders with custom style', () => {
    render(<Button title="Custom" style={{ marginTop: 10 }} />);
    expect(screen.getByText('Custom')).toBeTruthy();
  });

  it('renders with custom text style', () => {
    render(<Button title="Custom Text" textStyle={{ fontSize: 20 }} />);
    expect(screen.getByText('Custom Text')).toBeTruthy();
  });
});
