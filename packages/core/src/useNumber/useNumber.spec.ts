import { renderHook, act } from '@testing-library/react-hooks';
import { useNumber } from './useNumber';

const initial = 0;

describe('useCounter', () => {
  describe('Initializes the state', () => {
    it('base', () => {
      const { result } = renderHook(() => useNumber(initial));
      expect(result.current[0]).toBe(0);
    });

    it('lazy', () => {
      const { result } = renderHook(() => useNumber(() => initial));
      expect(result.current[0]).toBe(0);
    });
  });

  describe('setters', () => {
    it('increments', () => {
      const { result } = renderHook(() => useNumber(initial));

      act(() => {
        result.current[1].inc();
      });
      expect(result.current[0]).toBe(initial + 1);

      act(() => {
        result.current[1].inc(10);
      });
      expect(result.current[0]).toBe(initial + 1 + 10);
    });

    it('decrements', () => {
      const { result } = renderHook(() => useNumber(initial));

      act(() => {
        result.current[1].dec();
      });
      expect(result.current[0]).toBe(initial - 1);

      act(() => {
        result.current[1].dec(10);
      });
      expect(result.current[0]).toBe(initial - 1 - 10);
    });

    it('divides', () => {
      const initial = 4;
      const expected = 2;
      const { result } = renderHook(() => useNumber(initial));

      act(() => {
        result.current[1].divide(2);
      });
      expect(result.current[0]).toBe(expected);
    });

    it('multiplies', () => {
      const initial = 2;
      const expected = 4;
      const { result } = renderHook(() => useNumber(initial));

      act(() => {
        result.current[1].times(2);
      });
      expect(result.current[0]).toBe(expected);
    });

    it('sets', () => {
      const { result } = renderHook(() => useNumber(initial));

      act(() => {
        result.current[1].set(100);
      });
      expect(result.current[0]).toBe(100);
    });

    it('resets', () => {
      const { result } = renderHook(() => useNumber(initial));
      act(() => {
        result.current[1].inc(10);
        result.current[1].reset();
      });
      expect(result.current[0]).toBe(initial);
    });
  });
});
