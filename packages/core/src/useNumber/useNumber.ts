import { useState, useCallback } from 'react';
import { resolveValue } from '../utils';

/**
 * Signature of the setters provided by `useCounter`
 * @public
 */
export interface NumberSetter {
  /** Sets the state to a given value */
  set: React.Dispatch<React.SetStateAction<number>>;
  /** Increments the state by a given value. Defaults to `1` */
  inc: (value?: number) => void;
  /** Decrements the state by a given value. Defaults to `1` */
  dec: (value?: number) => void;
  /** Multiplies the state by a given value. */
  times: (value: number) => void;
  /** Divides the state by a given value. */
  divide: (value: number) => void;
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
export const useNumber = (
  initialState: number | (() => number),
): [number, NumberSetter] => {
  const [value, set] = useState<number>(initialState);

  const inc: NumberSetter['inc'] = useCallback(
    (increment = 1) => set(current => current + increment),
    [set],
  );

  const dec: NumberSetter['dec'] = useCallback(
    (decrement = 1) => set(current => current - decrement),
    [set],
  );

  const times: NumberSetter['times'] = useCallback(
    times => set(current => current * times),
    [set],
  );

  const divide: NumberSetter['times'] = useCallback(
    value => set(current => current / value),
    [set],
  );

  const reset: NumberSetter['reset'] = useCallback(
    () => set(resolveValue(initialState)),
    [set, initialState],
  );

  return [value, { set, inc, dec, times, divide, reset }];
};
