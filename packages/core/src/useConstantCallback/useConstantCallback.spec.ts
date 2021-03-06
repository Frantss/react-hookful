import { renderHook } from '@testing-library/react-hooks';
import { useConstantCallback } from './useConstantCallback';

describe('useFreezedCallback', () => {
  it('respects initial state', () => {
    const callback = (): number => 0;

    const { result } = renderHook(() => useConstantCallback(callback));

    expect(result.current).toBe(callback);
  });

  it('maintains the same callback through re-renders', () => {
    const callback = (): number => 0;

    const { result, rerender } = renderHook(() =>
      useConstantCallback(callback),
    );

    expect(result.current).toBe(callback);
    rerender();
    expect(result.current).toBe(callback);
  });

  it('passed callback is not called', () => {
    const callback = jest.fn();

    const { result } = renderHook(() => useConstantCallback(callback));

    expect(result.current).toBeCalledTimes(0);
  });
});
