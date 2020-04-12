import { renderHook, act } from '@testing-library/react-hooks';
import useStateObject from '../src/useStateObject';

describe('useStateObject', () => {
  it('should respect initial state', () => {
    const initialState = { a: 'a', b: 'b' };

    const { result } = renderHook(() => useStateObject(initialState));

    expect(result.current[0]).toStrictEqual(initialState);
  });

  it('merges the input with the current state', async () => {
    const { result } = renderHook(() => useStateObject({ a: 'a' }));

    act(() => {
      result.current[1]({ b: 'b' });
    });

    expect(result.current[0]).toStrictEqual({ a: 'a', b: 'b' });
  });

  it('resets the state', () => {
    const { result } = renderHook(() => useStateObject({ a: 'a' }));

    act(() => {
      result.current[1]({ b: 'b' });
      result.current[2]();
    });
    expect(result.current[0]).toStrictEqual({ a: 'a' });
  });
});
