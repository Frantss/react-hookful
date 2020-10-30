import { useState, useCallback } from 'react';
import { resolveValue } from '../utils';

/**
 * Signature of the setters provided by `useCounter`
 * @public
 */
export interface CounterSetter {
  /** Sets the state to a given value */
  set: (value: number | ((prev: number) => number)) => void;
  /** Increments the state by a given value. Defaults to `1` */
  inc: (value?: number) => void;
  /** Decrements the state by a given value. Defaults to `1` */
  dec: (value?: number) => void;
  /** Resets the state back to its initial value */
  reset: () => void;
}

/**
 * Simple hook to keep a numeric state with some useful setters.
 *
 * @public
 * @param initialState - Either the initial value or a function that resolves to it for lazy loading.
 * @returns A tuple with the state value, and an object with its setters.
 */
export const useCounter = (
  initialState: number | (() => number),
): [number, CounterSetter] => {
  const [value, set] = useState(initialState);

  const inc = useCallback(
    (increment = 1): void => set((currState: number) => currState + increment),
    [set],
  );

  const dec = useCallback(
    (decrement = 1): void => set((currState: number) => currState - decrement),
    [set],
  );

  const reset = useCallback((): void => set(resolveValue(initialState)), [
    set,
    initialState,
  ]);

  return [value, { set, inc, dec, reset }];
};
