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
 * @param initialValue - Either the initial value or a function that resolves to it for lazy loading.
 * @returns A tuple with the state value, and an object with its setters.
 * @public
 */
export const useCounter = (initialValue: number | (() => number)): [number, CounterSetter] => {
  const [value, set] = useState(initialValue);

  const inc = useCallback(
    (increment = 1): void => set((prevValue: number) => prevValue + increment),
    [set],
  );

  const dec = useCallback(
    (decrement = 1): void => set((prevValue: number) => prevValue - decrement),
    [set],
  );

  const reset = useCallback((): void => set(resolveValue(initialValue)), [set, initialValue]);

  return [value, { set, inc, dec, reset }];
};
