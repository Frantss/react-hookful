import { renderHook, act } from '@testing-library/react-hooks';
import { useToggle } from '../src/useToggle';

describe('useToggle', () => {
  it('respects initial state', () => {
    const hook1 = renderHook(() => useToggle(true));
    expect(hook1.result.current[0]).toBe(true);

    const hook2 = renderHook(() => useToggle(false));
    expect(hook2.result.current[0]).toBe(false);
  });

  it('respects initial lazy loaded state', () => {
    const hook1 = renderHook(() => useToggle(() => true));
    expect(hook1.result.current[0]).toBe(true);

    const hook2 = renderHook(() => useToggle(() => false));
    expect(hook2.result.current[0]).toBe(false);
  });

  it('toggles the current state', () => {
    const { result } = renderHook(() => useToggle(true));
    act(() => {
      result.current[1].toggle();
    });
    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1].toggle();
    });
    expect(result.current[0]).toBe(true);
  });

  it('sets the state', () => {
    const hook1 = renderHook(() => useToggle(true));
    act(() => {
      hook1.result.current[1].setFalse();
    });
    expect(hook1.result.current[0]).toBe(false);

    const hook2 = renderHook(() => useToggle(false));
    act(() => {
      hook2.result.current[1].setTrue();
    });
    expect(hook2.result.current[0]).toBe(true);
  });
});
