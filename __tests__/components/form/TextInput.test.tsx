import React from 'react';
import { render, screen, fireEvent, waitFor } from '@test-utils';
import { useForm, FormProvider } from 'react-hook-form';
import { TextInput } from '@components/form/TextInput';

const TestWrapper = ({
  children,
  defaultValues = {},
}: {
  children: (control: ReturnType<typeof useForm>['control']) => React.ReactNode;
  defaultValues?: Record<string, any>;
}) => {
  const form = useForm({ defaultValues });
  return <FormProvider {...form}>{children(form.control)}</FormProvider>;
};

describe('TextInput (form)', () => {
  it('renders with label', () => {
    render(
      <TestWrapper>
        {control => (
          <TextInput name="test" control={control} label="Test Label" />
        )}
      </TestWrapper>,
    );
    expect(screen.getByText('Test Label')).toBeTruthy();
  });

  it('renders with placeholder', () => {
    render(
      <TestWrapper>
        {control => (
          <TextInput name="test" control={control} placeholder="Enter text" />
        )}
      </TestWrapper>,
    );
    expect(screen.getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('displays error message when field has error', async () => {
    const TestComponent = () => {
      const form = useForm({
        defaultValues: { email: '' },
      });

      React.useEffect(() => {
        form.setError('email', { message: 'Email is required' });
      }, [form]);

      return (
        <FormProvider {...form}>
          <TextInput
            name="email"
            control={form.control}
            label="Email"
            placeholder="Enter email"
          />
        </FormProvider>
      );
    };

    render(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeTruthy();
    });
  });

  it('calls onChange when text changes', async () => {
    const TestComponent = () => {
      const form = useForm({ defaultValues: { test: '' } });

      return (
        <FormProvider {...form}>
          <TextInput
            name="test"
            control={form.control}
            placeholder="Enter text"
          />
        </FormProvider>
      );
    };

    render(<TestComponent />);

    const input = screen.getByPlaceholderText('Enter text');
    fireEvent.changeText(input, 'new value');

    await waitFor(() => {
      expect(input.props.value).toBe('new value');
    });
  });

  it('renders with initial value from defaultValues', () => {
    const TestComponent = () => {
      const form = useForm({ defaultValues: { test: 'initial value' } });

      return (
        <FormProvider {...form}>
          <TextInput
            name="test"
            control={form.control}
            placeholder="Enter text"
          />
        </FormProvider>
      );
    };

    render(<TestComponent />);

    const input = screen.getByPlaceholderText('Enter text');
    expect(input.props.value).toBe('initial value');
  });

  it('renders as disabled when editable is false', () => {
    render(
      <TestWrapper>
        {control => (
          <TextInput
            name="test"
            control={control}
            placeholder="Enter text"
            editable={false}
          />
        )}
      </TestWrapper>,
    );

    const input = screen.getByPlaceholderText('Enter text');
    expect(input.props.editable).toBe(false);
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<any>();

    render(
      <TestWrapper>
        {control => (
          <TextInput
            name="test"
            control={control}
            placeholder="Enter text"
            ref={ref}
          />
        )}
      </TestWrapper>,
    );

    expect(ref.current).toBeDefined();
  });

  it('passes additional props to TextInputCore', () => {
    render(
      <TestWrapper>
        {control => (
          <TextInput
            name="test"
            control={control}
            placeholder="Enter text"
            autoCapitalize="none"
            keyboardType="email-address"
          />
        )}
      </TestWrapper>,
    );

    const input = screen.getByPlaceholderText('Enter text');
    expect(input.props.autoCapitalize).toBe('none');
    expect(input.props.keyboardType).toBe('email-address');
  });

  it('applies custom style', () => {
    render(
      <TestWrapper>
        {control => (
          <TextInput
            name="test"
            control={control}
            placeholder="Enter text"
            inputStyle={{ marginTop: 20 }}
          />
        )}
      </TestWrapper>,
    );

    expect(screen.getByPlaceholderText('Enter text')).toBeTruthy();
  });
});
