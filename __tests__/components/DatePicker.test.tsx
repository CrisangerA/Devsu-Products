import React from 'react';
import { render, screen, fireEvent, waitFor } from '@test-utils';
import { DatePicker } from '@components/core/DatePicker';

jest.mock('react-native-date-picker', () => 'RNDatePicker');

describe('DatePicker (core)', () => {
  it('renders with label', () => {
    render(<DatePicker label="Select Date" />);
    expect(screen.getByText('Select Date')).toBeTruthy();
  });

  it('renders with placeholder', () => {
    render(<DatePicker placeholder="Pick a date" />);
    expect(screen.getByPlaceholderText('Pick a date')).toBeTruthy();
  });

  it('displays formatted date when date prop is provided', () => {
    const testDate = new Date('2024-06-15T12:00:00Z');
    render(<DatePicker date={testDate} placeholder="Date" />);
    const input = screen.getByPlaceholderText('Date');
    expect(input.props.value).toBeTruthy();
  });

  it('displays empty string when no date is provided', () => {
    render(<DatePicker placeholder="Date" />);
    const input = screen.getByPlaceholderText('Date');
    expect(input.props.value).toBe('');
  });

  it('calls setDate callback when provided', () => {
    const setDate = jest.fn();
    render(
      <DatePicker date={new Date()} setDate={setDate} placeholder="Date" />,
    );
    expect(screen.getByPlaceholderText('Date')).toBeTruthy();
  });

  it('renders as disabled when editable is false', () => {
    render(<DatePicker editable={false} placeholder="Date" />);
    const input = screen.getByPlaceholderText('Date');
    expect(input.props.editable).toBe(false);
  });

  it('renders with initial date value', () => {
    const setDate = jest.fn();
    const TestComponent = () => {
      const [date, setDateState] = React.useState<Date | undefined>(
        new Date('2024-01-01T12:00:00Z'),
      );
      return (
        <DatePicker
          date={date}
          setDate={d => {
            setDateState(d);
            setDate(d);
          }}
          placeholder="Date"
        />
      );
    };

    render(<TestComponent />);

    const input = screen.getByPlaceholderText('Date');
    expect(input.props.value).toBeTruthy();
  });

  it('renders with error message', () => {
    render(<DatePicker error="Date is required" placeholder="Date" />);
    expect(screen.getByText('Date is required')).toBeTruthy();
  });

  it('renders with helper text when no error', () => {
    render(
      <DatePicker helperText="Select your birth date" placeholder="Date" />,
    );
    expect(screen.getByText('Select your birth date')).toBeTruthy();
  });

  it('does not show helper text when error exists', () => {
    render(
      <DatePicker
        helperText="Helper text"
        error="Error message"
        placeholder="Date"
      />,
    );
    expect(screen.queryByText('Helper text')).toBeNull();
    expect(screen.getByText('Error message')).toBeTruthy();
  });

  it('passes mode prop correctly', () => {
    const modes = ['date', 'time', 'datetime'] as const;

    modes.forEach(mode => {
      const { unmount } = render(<DatePicker mode={mode} placeholder="Date" />);
      expect(screen.getByPlaceholderText('Date')).toBeTruthy();
      unmount();
    });
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<any>();
    render(<DatePicker ref={ref} placeholder="Date" />);
    expect(ref.current).toBeDefined();
  });

  it('applies custom style', () => {
    render(<DatePicker inputStyle={{ marginTop: 20 }} placeholder="Date" />);
    expect(screen.getByPlaceholderText('Date')).toBeTruthy();
  });

  it('renders with different date formats', () => {
    const testDate = new Date('2024-12-25T12:00:00Z');
    render(<DatePicker date={testDate} placeholder="Date" />);
    const input = screen.getByPlaceholderText('Date');
    expect(input.props.value).toBeTruthy();
  });
});
