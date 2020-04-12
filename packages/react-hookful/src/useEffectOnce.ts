import { useEffect, EffectCallback } from 'react';

/**
 * A simple `React.useEffect` wrapper for ensuring the effect is run once and eslint
 * doesn't complain.
 *
 * @param fn - Imperative function that can return a cleanup function.
 */
const useEffectOnce = <T extends EffectCallback>(fn: T): void => {
  useEffect(fn, []); // eslint-disable-line
};

export default useEffectOnce;
