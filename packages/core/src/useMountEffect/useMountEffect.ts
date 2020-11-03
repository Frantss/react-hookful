import { useEffect, EffectCallback } from 'react';

/**
 * Semantic wrapper on `React.useEffect`.
 * Runs a given effect only once, on mount (first render).
 *
 * @public
 * @param effect - Effect to be run on mount
 */
export const useMountEffect = (effect: EffectCallback) => {
  useEffect(effect, []); // eslint-disable-line
};
