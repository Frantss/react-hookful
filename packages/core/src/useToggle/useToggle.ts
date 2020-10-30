import { useState, useCallback } from 'react';

/** Setters of the state maintained by `useToggle`
 * @public
 */
export interface TogglerSetter {
  /** Toggles the state value between `true` and `false` */
  toggle: () => void;
  /** Sets the state value to `true` */
  setTrue: () => void;
  /** Sets the state value to `false` */
  setFalse: () => void;
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
export const useToggle = (
  initialValue: boolean | (() => boolean),
): [boolean, TogglerSetter] => {
  const [value, set] = useState(initialValue);

  const setTrue = useCallback(() => set(true), [set]);
  const setFalse = useCallback(() => set(false), [set]);
  const toggle = value ? setFalse : setTrue;

  return [value, { toggle, setTrue, setFalse, set }];
};
