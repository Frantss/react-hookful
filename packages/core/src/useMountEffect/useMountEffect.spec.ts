import { renderHook } from '@testing-library/react-hooks';
import { EffectCallback } from 'react';
import { useMountEffect } from './useMountEffect';

const renderTestHook = (effect: EffectCallback) =>
  renderHook(() => useMountEffect(effect));

describe('useEffectOnce', () => {
  describe('runs onces on', () => {
    it('mount', () => {
      const effect = jest.fn();

      renderTestHook(effect);

      expect(effect).toBeCalledTimes(1);
    });
  });

  describe("doesn't run more than once on", () => {
    it('unmount', () => {
      const effect = jest.fn();

      const { unmount } = renderTestHook(effect);
      unmount();

      expect(effect).toBeCalledTimes(1);
    });

    it('rerender', () => {
      const effect = jest.fn();

      const { rerender } = renderTestHook(effect);

      rerender();
      rerender();
      rerender();
      expect(effect).toBeCalledTimes(1);
    });
  });

  it('runs cleanup', () => {
    const cleanup = jest.fn();
    const effect = jest.fn(() => cleanup);

    const { unmount, rerender } = renderTestHook(effect);
    rerender();
    unmount();

    expect(effect).toBeCalledTimes(1);
    expect(cleanup).toBeCalledTimes(1);
  });
});
