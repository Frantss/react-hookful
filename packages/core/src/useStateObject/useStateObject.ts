import { useState, useCallback } from 'react';

/** Setters of the state maintained by `useStateObject`
 * @public
 */
export interface StateObjectSetter {
  /** Merges the current state with the `arg` object. */
  merge: (arg: object) => void;
  /**  State setter, the same you would get with `React.useState`. */
  set: (arg: object | ((prevState: object) => object)) => void;
  /** Resets the state back to the initial one. */
  reset: () => void;
  /** Sets the state to an empty object (`{}`). */
  clear: () => void;
}

/**
 * Hook for creating an object with several setters for ease of use. Like state merging and resetting.
 *
 * @param initialState - Initial state value.
 * @returns A tuple with the current state, and the setters.
 * @public
 */
export const useStateObject = (initialState: object): [object, StateObjectSetter] => {
  const [state, set] = useState(initialState);

  const merge = useCallback(
    (newState: object) => set(prevState => ({ ...prevState, ...newState })),
    [set],
  );

  const reset = useCallback(() => set(initialState), [set, initialState]);
  const clear = useCallback(() => set({}), [set]);

  return [state, { set, merge, reset, clear }];
};
