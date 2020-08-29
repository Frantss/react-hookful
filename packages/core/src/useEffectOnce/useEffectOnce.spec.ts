import { renderHook } from '@testing-library/react-hooks';
import { useEffectOnce } from './useEffectOnce';

describe('useEffectOnce', () => {
  it('runs the side effect only once', () => {
    const sideEffect = jest.fn();

    const { rerender } = renderHook(() => useEffectOnce(sideEffect));

    expect(sideEffect).toBeCalledTimes(1);
    rerender();
    expect(sideEffect).toBeCalledTimes(1);
  });
});
