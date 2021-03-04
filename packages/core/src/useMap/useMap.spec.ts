import { renderHook, act } from '@testing-library/react-hooks';
import { useMap } from './useMap';

const renderTestHook = <K = any, V = any>(
  initialState: Map<K, V> | (() => Map<K, V>),
) => renderHook(() => useMap<K, V>(initialState));

describe('useMap', () => {
  describe('initializes the state', () => {
    it('base', () => {
      const initialState = new Map([
        ['a', 'a'],
        ['b', 'b'],
      ]);

      const { result } = renderTestHook(initialState);

      expect(result.current[0]).toStrictEqual(initialState);
    });

    it('lazy', () => {
      const initialState = new Map([
        ['a', 'a'],
        ['b', 'b'],
      ]);

      const { result } = renderTestHook(() => initialState);

      expect(result.current[0]).toStrictEqual(initialState);
    });
  });

  describe('setters', () => {
    it('clear', () => {
      const initialState = new Map([
        ['a', 'a'],
        ['b', 'b'],
      ]);

      const { result } = renderTestHook(initialState);

      act(() => {
        result.current[1].clear();
      });

      expect(result.current[0]).toStrictEqual(new Map());
    });

    it('insert', () => {
      const initialState = new Map([
        ['a', 'a'],
        ['b', 'b'],
      ]);

      const newElement: [string, string] = ['c', 'c'];

      const expected = new Map([...initialState, newElement]);

      const { result } = renderTestHook(initialState);

      act(() => {
        result.current[1].insert(newElement[0], newElement[1]);
      });

      expect(result.current[0]).toStrictEqual(expected);
    });

    it('remove', () => {
      const initialState = new Map([
        ['a', 'a'],
        ['b', 'b'],
      ]);

      const keyToRemove = 'b';

      const { result } = renderTestHook(initialState);

      act(() => {
        result.current[1].remove(keyToRemove);
      });

      initialState.delete(keyToRemove);
      const expected = initialState;

      expect(result.current[0]).toStrictEqual(expected);
    });

    it('set', () => {
      const initialState = new Map([
        ['a', 'a'],
        ['b', 'b'],
      ]);

      const expected = new Map([
        ['c', 'c'],
        ['d', 'd'],
      ]);

      const { result } = renderTestHook(initialState);

      act(() => {
        result.current[1].set(expected);
      });

      expect(result.current[0]).toStrictEqual(expected);
    });

    it('set with currState reference', () => {
      const initialState = new Map([
        ['a', 'a'],
        ['b', 'b'],
      ]);

      const newMap = new Map([
        ['c', 'c'],
        ['d', 'd'],
      ]);

      const expected = new Map([...newMap, ...initialState]);

      const { result } = renderTestHook(initialState);

      act(() => {
        result.current[1].set(curr => new Map([...curr, ...newMap]));
      });

      expect(result.current[0]).toStrictEqual(expected);
    });
  });
});
