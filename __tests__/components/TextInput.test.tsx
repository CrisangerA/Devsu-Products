import React from 'react';
import { render, screen, fireEvent } from '@test-utils';
import { TextInput } from '@components/core/TextInput';

describe('TextInput', () => {
  it('renders correctly with placeholder', () => {
    render(<TextInput placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('renders with label', () => {
    render(<TextInput label="Email" placeholder="Enter email" />);
    expect(screen.getByText('Email')).toBeTruthy();
  });

  it('renders with error message', () => {
    render(<TextInput error="Invalid input" placeholder="Enter text" />);
    expect(screen.getByText('Invalid input')).toBeTruthy();
  });

  it('renders with helper text when no error', () => {
    render(
      <TextInput helperText="This is helper text" placeholder="Enter text" />,
    );
    expect(screen.getByText('This is helper text')).toBeTruthy();
  });

  it('does not show helper text when error exists', () => {
    render(
      <TextInput
        helperText="Helper text"
        error="Error message"
        placeholder="Enter text"
      />,
    );
    expect(screen.queryByText('Helper text')).toBeNull();
    expect(screen.getByText('Error message')).toBeTruthy();
  });

  it('calls onFocus when focused', () => {
    const onFocus = jest.fn();
    render(<TextInput placeholder="Enter text" onFocus={onFocus} />);

    fireEvent(screen.getByPlaceholderText('Enter text'), 'focus');
    expect(onFocus).toHaveBeenCalled();
  });

  it('calls onBlur when blurred', () => {
    const onBlur = jest.fn();
    render(<TextInput placeholder="Enter text" onBlur={onBlur} />);

    fireEvent(screen.getByPlaceholderText('Enter text'), 'blur');
    expect(onBlur).toHaveBeenCalled();
  });

  it('renders with left icon', () => {
    render(
      <TextInput
        placeholder="Search"
        leftIcon={React.createElement('View', { testID: 'left-icon' })}
      />,
    );
    expect(screen.getByPlaceholderText('Search')).toBeTruthy();
  });

  it('renders with right icon', () => {
    render(
      <TextInput
        placeholder="Password"
        rightIcon={React.createElement('View', { testID: 'right-icon' })}
      />,
    );
    expect(screen.getByPlaceholderText('Password')).toBeTruthy();
  });

  it('applies different variants', () => {
    const variants = ['default', 'outlined', 'filled'] as const;

    variants.forEach(variant => {
      const { unmount } = render(
        <TextInput placeholder="Test" variant={variant} />,
      );
      expect(screen.getByPlaceholderText('Test')).toBeTruthy();
      unmount();
    });
  });

  it('applies different sizes', () => {
    const sizes = ['md', 'lg'] as const;

    sizes.forEach(size => {
      const { unmount } = render(<TextInput placeholder="Test" size={size} />);
      expect(screen.getByPlaceholderText('Test')).toBeTruthy();
      unmount();
    });
  });

  it('applies fullWidth style', () => {
    render(<TextInput placeholder="Full Width" fullWidth />);
    expect(screen.getByPlaceholderText('Full Width')).toBeTruthy();
  });

  it('renders as disabled when editable is false', () => {
    render(<TextInput placeholder="Disabled" editable={false} />);
    const input = screen.getByPlaceholderText('Disabled');
    expect(input).toBeTruthy();
  });

  it('applies custom container style', () => {
    render(
      <TextInput placeholder="Custom" containerStyle={{ marginTop: 20 }} />,
    );
    expect(screen.getByPlaceholderText('Custom')).toBeTruthy();
  });

  it('applies custom input style', () => {
    render(
      <TextInput placeholder="Custom" inputStyle={{ marginHorizontal: 10 }} />,
    );
    expect(screen.getByPlaceholderText('Custom')).toBeTruthy();
  });

  it('uses custom placeholder text color', () => {
    render(
      <TextInput placeholder="Custom Color" placeholderTextColor="#ff0000" />,
    );
    expect(screen.getByPlaceholderText('Custom Color')).toBeTruthy();
  });
});
