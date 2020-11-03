import { renderHook } from '@testing-library/react-hooks';
import { useMountEffect } from './useMountEffect';

describe('useEffectOnce', () => {
  it('runs the side effect only once', () => {
    const sideEffect = jest.fn();

    const { rerender } = renderHook(() => useMountEffect(sideEffect));

    expect(sideEffect).toBeCalledTimes(1);
    rerender();
    expect(sideEffect).toBeCalledTimes(1);
  });
});
