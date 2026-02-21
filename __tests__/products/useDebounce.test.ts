import { renderHook, act } from '@testing-library/react-native';
import { useDebounce } from '@modules/products/application/hooks/useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 500));

    expect(result.current).toBe('test');
  });

  it('debounces value changes with default delay', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useDebounce(value),
      { initialProps: { value: 'initial' } },
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'changed' });

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('changed');
  });

  it('debounces value changes with custom delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) =>
        useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 1000 } },
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'changed', delay: 1000 });

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('changed');
  });

  it('cancels previous timer on value change', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } },
    );

    rerender({ value: 'first' });
    rerender({ value: 'second' });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('second');
  });

  it('works with different value types', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: number }) => useDebounce(value, 300),
      { initialProps: { value: 0 } },
    );

    expect(result.current).toBe(0);

    rerender({ value: 42 });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe(42);
  });

  it('works with object values', () => {
    const initialObj = { name: 'test' };
    const changedObj = { name: 'changed' };

    const { result, rerender } = renderHook(
      ({ value }: { value: { name: string } }) => useDebounce(value, 300),
      { initialProps: { value: initialObj } },
    );

    expect(result.current).toBe(initialObj);

    rerender({ value: changedObj });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe(changedObj);
  });

  it('cleans up timer on unmount', () => {
    const { unmount, rerender } = renderHook(
      ({ value }: { value: string }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } },
    );

    rerender({ value: 'changed' });

    const clearTimeoutSpy = jest.spyOn(globalThis, 'clearTimeout');

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });
});
