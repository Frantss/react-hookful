import { renderHook, act } from '@testing-library/react-hooks';
import useStateObject from '../src/useStateObject';

describe('useStateObject', () => {
  it('should respect initial state', () => {
    const initialState = { a: 'a', b: 'b' };

    const { result } = renderHook(() => useStateObject(initialState));

    expect(result.current[0]).toStrictEqual(initialState);
  });

  it('merges the state with a given input', () => {
    const { result } = renderHook(() => useStateObject({ a: 'a' }));

    act(() => {
      result.current[1].merge({ b: 'b' });
    });

    expect(result.current[0]).toStrictEqual({ a: 'a', b: 'b' });
  });

  it('sets the state with a given input', () => {
    const { result } = renderHook(() => useStateObject({ a: 'a' }));

    act(() => {
      result.current[1].set({ b: 'b' });
    });

    expect(result.current[0]).toStrictEqual({ b: 'b' });
  });

  it('sets the state using a reference to the current one', () => {
    const { result } = renderHook(() => useStateObject({ a: 'a' }));

    act(() => {
      result.current[1].set(prevState => ({
        ...prevState,
        b: 'b',
      }));
    });

    expect(result.current[0]).toStrictEqual({ a: 'a', b: 'b' });
  });

  it('resets the state', () => {
    const { result } = renderHook(() => useStateObject({ a: 'a' }));

    act(() => {
      result.current[1].merge({ b: 'b' });
      result.current[1].reset();
    });
    expect(result.current[0]).toStrictEqual({ a: 'a' });
  });

  it('clears the state', () => {
    const { result } = renderHook(() => useStateObject({ a: 'a' }));

    act(() => {
      result.current[1].clear();
    });
    expect(result.current[0]).toStrictEqual({});
  });
});
