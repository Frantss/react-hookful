import { useState, useCallback } from 'react';
import { resolveValue } from '../utils';

/** Setters of the state maintained by `useStateObject`
 * @public
 */
export interface StateObjectSetter<T extends object> {
  /** Merges the current state with the `arg` object. */
  merge: (arg: Partial<T> | ((currState: T) => Partial<T>)) => void;
  /**  State setter, the same you would get with `React.useState`. */
  set: (arg: T | ((currState: T) => T)) => void;
  /** Resets the state back to the initial one. */
  reset: () => void;
}

/**
 * Hook for creating an object with several setters for ease of use. Like state merging and resetting.
 *
 * @param initialState - Initial state value.
 * @returns A tuple with the current state, and the setters.
 * @public
 */
export const useStateObject = <T extends object>(
  initialState: T,
): [T, StateObjectSetter<T>] => {
  const [state, set] = useState(initialState);

  const merge = useCallback(
    (newState: Partial<T> | ((currState: T) => Partial<T>)) =>
      set(currState => ({ ...currState, ...resolveValue(newState) })),
    [set],
  );

  const reset = useCallback(() => set(initialState), [set, initialState]);

  return [state, { set, merge, reset }];
};
