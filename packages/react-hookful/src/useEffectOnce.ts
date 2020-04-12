import { useEffect, EffectCallback } from 'react';

/**
 * This hook its a simple wrapper of `React.useEffect` with and empty dependencies array.
 * It ensures the return function is always the same.
 *
 * @param fn - Imperative function that can return a cleanup function.
 */
const useEffectOnce = <T extends EffectCallback>(fn: T): void => {
  useEffect(fn, []); // eslint-disable-line
};

export default useEffectOnce;
