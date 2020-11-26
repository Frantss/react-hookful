import { useEffect, EffectCallback } from 'react';

/**
 * Semantic wrapper on `React.useEffect`.
 * Runs a given effect only once, on mount (first render).
 *
 * This hook should only be used when you are sure the possible dependencies shouldn't make the effect re-run.
 * By not re-running the effect on a dependency change may be _hiding_ bugs.
 *
 * @public
 * @param effect - Effect to be run on mount
 */
export const useMountEffect = (effect: EffectCallback) => {
  useEffect(effect, []); // eslint-disable-line
};
