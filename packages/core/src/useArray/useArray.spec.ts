import { act, renderHook } from '@testing-library/react-hooks';
import { useArray } from './useArray';

const renderTestHook = <T>(initialState: T[] | (() => T[])) =>
  renderHook(() => useArray(initialState));

const array = [1, 2, 3, 4];

describe('useArray', () => {
  describe('initializes the state', () => {
    it('basic', () => {
      const { result } = renderTestHook(array);

      expect(result.current[0]).toStrictEqual(array);
    });

    it('lazy', () => {
      const { result } = renderTestHook(() => array);

      expect(result.current[0]).toStrictEqual(array);
    });
  });

  describe('basic setters', () => {
    it('appends element to the state', () => {
      const expected = [...array, 5];
      const { result } = renderTestHook(array);

      act(() => {
        result.current[1].append(expected.slice(-1)[0]);
      });

      expect(result.current[0]).toStrictEqual(expected);
    });

    it('prepends element to the state', () => {
      const expected = [0, ...array];
      const { result } = renderTestHook(array);

      act(() => {
        result.current[1].prepend(expected[0]);
      });

      expect(result.current[0]).toStrictEqual(expected);
    });

    it('pops element from the state', () => {
      const expected = array.slice(0, -1);
      const expectedElement = array.slice(-1)[0];
      let element;
      const { result } = renderTestHook(array);

      act(() => {
        element = result.current[1].pop();
      });

      expect(result.current[0]).toStrictEqual(expected);
      expect(element).toBe(expectedElement);
    });

    it('shifts element from the state', () => {
      const [expectedElement, ...expected] = array;
      let element;
      const { result } = renderTestHook(array);

      act(() => {
        element = result.current[1].shift();
      });

      expect(result.current[0]).toStrictEqual(expected);
      expect(element).toBe(expectedElement);
    });

    it('clears the state', () => {
      const expected: number[] = [];
      const { result } = renderTestHook(array);

      act(() => {
        result.current[1].clear();
      });

      expect(result.current[0]).toStrictEqual(expected);
    });

    it('resets the state', () => {
      const expected = array;
      const { result } = renderTestHook(array);

      act(() => {
        result.current[1].pop();
        result.current[1].pop();
        result.current[1].reset();
      });

      expect(result.current[0]).toStrictEqual(expected);
    });

    it('concatenates the state', () => {
      const extra = [5, 6, 7];
      const expected = [...array, ...extra];
      const { result } = renderTestHook(array);

      act(() => {
        result.current[1].concat(extra);
      });

      expect(result.current[0]).toStrictEqual(expected);
    });
  });

  describe('functional setters', () => {
    it('transforms the state', () => {
      const transform = (n: number) => n * 2;
      const expected = array.map(transform);
      const { result } = renderTestHook(array);

      act(() => {
        result.current[1].transform(transform);
      });

      expect(result.current[0]).toStrictEqual(expected);
    });

    it('filters the state', () => {
      const filter = (n: number) => n % 2 === 0;
      const expected = array.filter(filter);
      const { result } = renderTestHook(array);

      act(() => {
        result.current[1].filter(filter);
      });

      expect(result.current[0]).toStrictEqual(expected);
    });
  });

  it('handles multiple state updates', () => {
    const expected = [20, 30, 40, 50];
    const { result } = renderTestHook(array);

    act(() => {
      result.current[1].pop();
      result.current[1].pop();
      result.current[1].shift();
      result.current[1].reset();
      result.current[1].clear();
      result.current[1].append(20);
      result.current[1].append(30);
      result.current[1].append(40);
      result.current[1].concat([50, 60]);
      result.current[1].filter(n => n !== 60);
    });

    expect(result.current[0]).toStrictEqual(expected);
  });
});
