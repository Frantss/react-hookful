import { renderHook, act } from '@testing-library/react-hooks';
import { useObject } from './useObject';

describe('useObject', () => {
  it('should respect initial state', () => {
    const initialState = { a: 'a', b: 'b' };

    const { result } = renderHook(() => useObject(initialState));

    expect(result.current[0]).toStrictEqual(initialState);
  });

  it('merges the state with a given input', () => {
    const { result } = renderHook(() => useObject({ a: 'a', b: 'c' }));

    act(() => {
      result.current[1].merge({ b: 'b' });
    });

    expect(result.current[0]).toStrictEqual({ a: 'a', b: 'b' });
  });

  it('sets the state with a given input', () => {
    const { result } = renderHook(() => useObject({ a: 'a', b: 'b' }));

    act(() => {
      result.current[1].set({ a: 'b', b: 'a' });
    });

    expect(result.current[0]).toStrictEqual({ a: 'b', b: 'a' });
  });

  it('sets the state using a reference to the current one', () => {
    const { result } = renderHook(() => useObject({ a: 'a' }));

    act(() => {
      result.current[1].set(prevState => ({
        ...prevState,
        b: 'b',
      }));
    });

    expect(result.current[0]).toStrictEqual({ a: 'a', b: 'b' });
  });

  it('resets the state', () => {
    const { result } = renderHook(() => useObject({ a: 'a' }));

    act(() => {
      result.current[1].set({ a: 'b' });
      result.current[1].reset();
    });
    expect(result.current[0]).toStrictEqual({ a: 'a' });
  });
});