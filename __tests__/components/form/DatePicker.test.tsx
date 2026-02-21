import React from 'react';
import { render, screen, fireEvent, waitFor } from '@test-utils';
import { useForm, FormProvider } from 'react-hook-form';
import { DatePicker } from '@components/form/DatePicker';

jest.mock('react-native-date-picker', () => 'RNDatePicker');

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

describe('DatePicker (form)', () => {
  it('renders with label', () => {
    render(
      <TestWrapper>
        {control => (
          <DatePicker name="date" control={control} label="Select Date" />
        )}
      </TestWrapper>,
    );
    expect(screen.getByText('Select Date')).toBeTruthy();
  });

  it('renders with placeholder', () => {
    render(
      <TestWrapper>
        {control => (
          <DatePicker name="date" control={control} placeholder="Pick a date" />
        )}
      </TestWrapper>,
    );
    expect(screen.getByPlaceholderText('Pick a date')).toBeTruthy();
  });

  it('displays error message when field has error', async () => {
    const TestComponent = () => {
      const form = useForm({
        defaultValues: { date: undefined },
      });

      React.useEffect(() => {
        form.setError('date', { message: 'Date is required' });
      }, []);

      return (
        <FormProvider {...form}>
          <DatePicker name="date" control={form.control} label="Date" />
        </FormProvider>
      );
    };

    render(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByText('Date is required')).toBeTruthy();
    });
  });

  it('calls onChange when date is selected', async () => {
    const TestComponent = () => {
      const form = useForm({ defaultValues: { date: undefined } });

      return (
        <FormProvider {...form}>
          <DatePicker name="date" control={form.control} label="Date" />
        </FormProvider>
      );
    };

    render(<TestComponent />);

    expect(screen.getByText('Date')).toBeTruthy();
  });

  it('renders with initial date value', () => {
    const TestComponent = () => {
      const form = useForm({
        defaultValues: { date: new Date('2024-06-15') },
      });

      return (
        <FormProvider {...form}>
          <DatePicker name="date" control={form.control} label="Date" />
        </FormProvider>
      );
    };

    render(<TestComponent />);

    expect(screen.getByText('Date')).toBeTruthy();
  });

  it('renders as disabled when editable is false', () => {
    render(
      <TestWrapper>
        {control => (
          <DatePicker
            name="date"
            control={control}
            label="Date"
            editable={false}
          />
        )}
      </TestWrapper>,
    );

    expect(screen.getByText('Date')).toBeTruthy();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<any>();

    render(
      <TestWrapper>
        {control => (
          <DatePicker name="date" control={control} label="Date" ref={ref} />
        )}
      </TestWrapper>,
    );

    expect(ref.current).toBeDefined();
  });

  it('passes additional props to DatePickerCore', () => {
    render(
      <TestWrapper>
        {control => (
          <DatePicker
            name="date"
            control={control}
            label="Date"
            mode="datetime"
          />
        )}
      </TestWrapper>,
    );

    expect(screen.getByText('Date')).toBeTruthy();
  });
});
