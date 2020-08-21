import { renderHook } from '@testing-library/react-hooks';
import { useConstant } from './useConstant';

describe('useConstantValue', () => {
  it('returns the state value', () => {
    const { result } = renderHook(() => useConstant('fernir'));
    expect(result.current()).toBe('fernir');
  });

  it('returns the state value from resolver', () => {
    const { result } = renderHook(() => useConstant(() => 'fernir'));
    expect(result.current()).toBe('fernir');
  });

  it('maintains the value constant through re-renders', () => {
    const { result, rerender } = renderHook(() => useConstant(() => Math.random()));

    const first = result.current();
    rerender();
    expect(result.current()).toBe(first);
    rerender();
    expect(result.current()).toBe(first);
  });

  it("resolver isn't called multiple times", () => {
    const resolver = jest.fn();
    const { result, rerender } = renderHook(() => useConstant(resolver));
    expect(resolver).toBeCalledTimes(0);

    result.current();
    expect(resolver).toBeCalledTimes(1);

    result.current();
    expect(resolver).toBeCalledTimes(1);

    rerender();
    expect(resolver).toBeCalledTimes(1);
  });

  it('handles undefined values', () => {
    const hook1 = renderHook(() => useConstant(undefined));
    expect(hook1.result.current).toBeDefined();
    expect(hook1.result.current()).toBeUndefined();

    const hook2 = renderHook(() => useConstant(() => undefined));
    expect(hook2.result.current).toBeDefined();
    expect(hook2.result.current()).toBeUndefined();
  });

  it('handles null values', () => {
    const hook1 = renderHook(() => useConstant(null));
    expect(hook1.result.current).toBeDefined();
    expect(hook1.result.current()).toBeNull();

    const hook2 = renderHook(() => useConstant(() => null));
    expect(hook2.result.current).toBeDefined();
    expect(hook2.result.current()).toBeNull();
  });
});
