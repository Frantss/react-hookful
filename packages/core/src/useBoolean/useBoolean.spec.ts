import { renderHook, act } from '@testing-library/react-hooks';
import { useBoolean } from './useBoolean';

describe('useToggle', () => {
  describe('allows initial state', () => {
    it('initial value is true', () => {
      const hook1 = renderHook(() => useBoolean(true));
      expect(hook1.result.current[0]).toBe(true);
    });

    it('initial value is false', () => {
      const hook2 = renderHook(() => useBoolean(false));
      expect(hook2.result.current[0]).toBe(false);
    });
  });

  describe('allows lazy initial value', () => {
    it('initial value resolves true', () => {
      const hook1 = renderHook(() => useBoolean(() => true));
      expect(hook1.result.current[0]).toBe(true);
    });

    it('initial value resolves false', () => {
      const hook2 = renderHook(() => useBoolean(() => false));
      expect(hook2.result.current[0]).toBe(false);
    });
  });

  describe('toggles the current state', () => {
    it('toggles the value to true', () => {
      const { result } = renderHook(() => useBoolean(false));
      act(() => {
        result.current[1].toggle();
      });
      expect(result.current[0]).toBe(true);
    });

    it('toggles the value to false', () => {
      const { result } = renderHook(() => useBoolean(false));

      act(() => {
        result.current[1].toggle();
      });
      expect(result.current[0]).toBe(true);
    });
  });

  describe('sets the state', () => {
    it('setFalse', () => {
      const hook1 = renderHook(() => useBoolean(true));
      act(() => {
        hook1.result.current[1].off();
      });
      expect(hook1.result.current[0]).toBe(false);
    });

    it('setTrue', () => {
      const hook2 = renderHook(() => useBoolean(false));
      act(() => {
        hook2.result.current[1].on();
      });
      expect(hook2.result.current[0]).toBe(true);
    });

    it('sets the state to true', () => {
      const hook1 = renderHook(() => useBoolean(true));
      act(() => {
        hook1.result.current[1].set(false);
      });
      expect(hook1.result.current[0]).toBe(false);
    });

    it('sets the state to false', () => {
      const hook2 = renderHook(() => useBoolean(false));
      act(() => {
        hook2.result.current[1].set(true);
      });
      expect(hook2.result.current[0]).toBe(true);
    });
  });
});
