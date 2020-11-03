import { renderHook } from '@testing-library/react-hooks';
import { usePrevious } from './usePrevious';

const renderTestHook = <T>(value: T) => renderHook(() => usePrevious(value));

describe('usePrevious', () => {
  it('initializes to undefined', () => {
    const value = 'value';

    const { result } = renderTestHook(value);

    expect(result.current).toBe(undefined);
  });

  it('returns previous value', () => {
    const expected = 'value';
    let value = expected;

    const { result, rerender } = renderTestHook(value);
    value = 'new_value';
    rerender();

    expect(result.current).toBe(expected);
  });
});
