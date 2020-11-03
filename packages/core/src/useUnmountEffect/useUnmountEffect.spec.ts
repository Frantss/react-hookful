import { renderHook } from '@testing-library/react-hooks';
import { useUnmountEffect } from './useUnmountEffect';

const renderTestHook = (effect: () => void, deps?: any[]) =>
  renderHook(() => useUnmountEffect(effect, deps));

describe('useEffectOnce', () => {
  describe('runs on', () => {
    it('unmount', () => {
      const effect = jest.fn();

      const { unmount } = renderTestHook(effect, []);
      unmount();

      expect(effect).toBeCalledTimes(1);
    });
  });

  describe("doesn't run on", () => {
    it('mount', () => {
      const effect = jest.fn();

      renderTestHook(effect);

      expect(effect).toBeCalledTimes(0);
    });

    it('subsequent rerender', () => {
      const effect = jest.fn();

      const { rerender } = renderTestHook(effect);

      rerender();
      rerender();
      rerender();
      expect(effect).toBeCalledTimes(0);
    });
  });
});
