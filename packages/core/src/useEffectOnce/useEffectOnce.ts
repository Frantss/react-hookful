import { useEffect, EffectCallback } from 'react';

/**
 * This hook its a simple wrapper of `React.useEffect` with and empty dependencies array.
 * It ensures the return function is always the same.
 *
 * @public
 * @param effect - Imperative function that can return a cleanup function.
 */
export const useEffectOnce = (effect: EffectCallback): void => {
  useEffect(effect, []); // eslint-disable-line
};
