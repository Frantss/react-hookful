import { renderHook } from '@testing-library/react-hooks';
import { useConstant } from './useConstant';

const renderTestHook = <T>(value: T | (() => T)) =>
  renderHook(() => useConstant(value));

describe('useConstantValue', () => {
  describe('sets values', () => {
    it('from value', () => {
      const expected = 'fernir';
      const { result } = renderTestHook(expected);

      expect(result.current).toBe(expected);
    });

    it('from resolver', () => {
      const expected = 'fernir';
      const { result } = renderTestHook(() => expected);

      expect(result.current).toBe(expected);
    });
  });

  it('value remains constant', () => {
    const { result, rerender } = renderTestHook(() => Math.random());

    const expected = result.current;
    rerender();
    rerender();

    expect(result.current).toBe(expected);
  });

  it('resolver is called once', () => {
    const resolver = jest.fn();
    renderTestHook(resolver);

    expect(resolver).toBeCalledTimes(1);
  });

  describe('allows undefined', () => {
    it('from value', () => {
      const { result } = renderTestHook(undefined);
      expect(result.current).toBeUndefined();
    });

    it('from resolver', () => {
      const { result } = renderTestHook(() => undefined);
      expect(result.current).toBeUndefined();
    });
  });

  describe('allows null', () => {
    it('from value', () => {
      const { result } = renderTestHook(null);
      expect(result.current).toBeNull();
    });

    it('from resolver', () => {
      const { result } = renderTestHook(() => null);
      expect(result.current).toBeNull();
    });
  });
});
