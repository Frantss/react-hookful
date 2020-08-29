import { renderHook, act } from '@testing-library/react-hooks';
import { useCounter } from './useCounter';

const initial = 0;

describe('useCounter', () => {
  it('maintains the initial state', () => {
    const hook1 = renderHook(() => useCounter(initial));
    expect(hook1.result.current[0]).toBe(0);

    const hook2 = renderHook(() => useCounter(() => initial));
    expect(hook2.result.current[0]).toBe(0);
  });

  it('increments the value correctly', () => {
    const { result } = renderHook(() => useCounter(initial));

    act(() => {
      result.current[1].inc();
    });
    expect(result.current[0]).toBe(initial + 1);

    act(() => {
      result.current[1].inc(10);
    });
    expect(result.current[0]).toBe(initial + 1 + 10);
  });

  it('decrements the value correctly', () => {
    const { result } = renderHook(() => useCounter(initial));

    act(() => {
      result.current[1].dec();
    });
    expect(result.current[0]).toBe(initial - 1);

    act(() => {
      result.current[1].dec(10);
    });
    expect(result.current[0]).toBe(initial - 1 - 10);
  });

  it('sets the value correctly', () => {
    const { result } = renderHook(() => useCounter(initial));

    act(() => {
      result.current[1].set(100);
    });
    expect(result.current[0]).toBe(100);
  });

  it('resets the value correctly', () => {
    const { result } = renderHook(() => useCounter(initial));
    act(() => {
      result.current[1].inc(10);
      result.current[1].reset();
    });
    expect(result.current[0]).toBe(initial);
  });
});
