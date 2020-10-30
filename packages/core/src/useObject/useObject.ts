import { useState, useCallback } from 'react';
import { resolveValue } from '../utils';

/** Setters of the state maintained by `useObject`
 * @public
 */
export interface ObjectSetter<T extends object> {
  /** Merges the current state with the `arg` object. */
  merge: (arg: Partial<T> | ((currState: T) => Partial<T>)) => void;
  /**  State setter, the same you would get with `React.useState`. */
  set: React.Dispatch<React.SetStateAction<T>>;
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
export const useObject = <T extends object>(
  initialState: T,
): [T, ObjectSetter<T>] => {
  const [state, set] = useState(initialState);

  const merge = useCallback(
    (newState: Partial<T> | ((currState: T) => Partial<T>)) =>
      set(currState => ({ ...currState, ...resolveValue(newState) })),
    [set],
  );

  const reset = useCallback(() => set(initialState), [set, initialState]);

  return [state, { set, merge, reset }];
};
