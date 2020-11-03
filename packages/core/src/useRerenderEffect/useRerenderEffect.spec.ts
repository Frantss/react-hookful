import { renderHook } from '@testing-library/react-hooks';
import { useRerenderEffect } from './useRerenderEffect';

const renderTestHook = (effect: () => void, deps?: any[]) =>
  renderHook(() => useRerenderEffect(effect, deps));

describe('useRerenderEffect', () => {
  describe('runs on', () => {
    it('rerender', () => {
      const effect = jest.fn();

      const { rerender } = renderTestHook(effect);

      rerender();
      rerender();
      rerender();
      expect(effect).toBeCalledTimes(3);
    });
  });

  describe("doesn't run on", () => {
    it('mount', () => {
      const effect = jest.fn();

      renderTestHook(effect);

      expect(effect).toBeCalledTimes(0);
    });

    it('unmount', () => {
      const effect = jest.fn();

      const { unmount } = renderTestHook(effect, []);
      unmount();

      expect(effect).toBeCalledTimes(0);
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
