import { useState, useCallback } from 'react';

/** Setters of the state maintained by `useBoolean`
 * @public
 */
export interface BooleanSetter {
  /** Toggles the state value between `true` and `false` */
  toggle: () => void;
  /** Sets the state value to `true` */
  on: () => void;
  /** Sets the state value to `false` */
  off: () => void;
  /** Sets the state value to a given boolean */
  set: (arg: boolean | (() => boolean)) => void;
}

/**
 * Hook that stores a boolean value, and provides logic for toggling and setting the value.
 *
 * The return value is a tuple with the value, toggler, and a object with the `true` and `false` setters.
 *
 * @public
 * @param initialValue - Either the initial value or a function that resolves to it for lazy loading.
 * @returns A tuple with the current state, the state toggler, and a object with `true` and `false` setters.
 */
export const useBoolean = (
  initialValue: boolean | (() => boolean),
): [boolean, BooleanSetter] => {
  const [value, set] = useState(initialValue);

  const on = useCallback(() => set(true), [set]);
  const off = useCallback(() => set(false), [set]);
  const toggle = useCallback(() => set(current => !current), [set]);

  return [value, { toggle, on, off, set }];
};
