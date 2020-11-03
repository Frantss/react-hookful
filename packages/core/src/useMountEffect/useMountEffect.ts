import { useEffect, EffectCallback } from 'react';

/**
 * This hook its a simple wrapper of `React.useEffect` with and empty dependencies array.
 * It runs the effect only once, at mount time.
 *
 * @public
 * @param effect - Imperative function that can return a cleanup function.
 */
export const useMountEffect = (effect: EffectCallback) => {
  useEffect(effect, []); // eslint-disable-line
};
