import { EffectCallback, useEffect, useRef } from 'react';

/**
 * Semantic wrapper on `React.useEffect`.
 * Runs a given effect only on re-renders.
 *
 * @public
 * @param effect - Function that is run on each re-render.
 * @param deps - If present, effect will only activate if the values in the list change.
 */
export const useRerenderEffect = (effect: EffectCallback, deps?: any[]) => {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      return effect();
    }

    mounted.current = true;
  }, deps); // eslint-disable-line
};
