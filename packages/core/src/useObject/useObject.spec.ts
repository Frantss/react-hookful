import { renderHook, act } from '@testing-library/react-hooks';
import { useObject } from './useObject';

const renderTestHook = <T extends object>(initialState: T) =>
  renderHook(() => useObject<T>(initialState));

describe('useObject', () => {
  describe('initializes state', () => {
    it('base', () => {
      const initialState = { a: 'a', b: 'b' };

      const { result } = renderTestHook(initialState);

      expect(result.current[0]).toStrictEqual(initialState);
    });

    it('lazy', () => {
      const initialState = { a: 'a', b: 'b' };

      const { result } = renderTestHook(() => initialState);

      expect(result.current[0]).toStrictEqual(initialState);
    });
  });

  describe('setters', () => {
    it('merge', () => {
      const { result } = renderTestHook({ a: 'a', b: 'c' });

      act(() => {
        result.current[1].merge({ b: 'b' });
      });

      expect(result.current[0]).toStrictEqual({ a: 'a', b: 'b' });
    });

    it('merge referencing current state', () => {
      const { result } = renderTestHook({ a: 'a', b: 'c' });

      act(() => {
        result.current[1].merge(curr => ({
          b: curr.a,
        }));
      });

      expect(result.current[0]).toStrictEqual({ a: 'a', b: 'a' });
    });

    it('set', () => {
      const { result } = renderTestHook({ a: 'a', b: 'b' });

      act(() => {
        result.current[1].set({ a: 'b', b: 'a' });
      });

      expect(result.current[0]).toStrictEqual({ a: 'b', b: 'a' });
    });

    it('sets referencing current state', () => {
      const { result } = renderHook(() => useObject({ a: 'a' }));

      act(() => {
        result.current[1].set(prevState => ({
          ...prevState,
          b: 'b',
        }));
      });

      expect(result.current[0]).toStrictEqual({ a: 'a', b: 'b' });
    });

    it('reset', () => {
      const initialState = { a: 'a' };
      const { result } = renderTestHook(initialState);

      act(() => {
        result.current[1].set({ a: 'b' });
        result.current[1].reset();
      });
      expect(result.current[0]).toStrictEqual(initialState);
    });
  });
});
