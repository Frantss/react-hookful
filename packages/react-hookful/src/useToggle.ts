import { useState } from 'react';
import useFreezedCallback from './useFreezedCallback';

/** Setters of the state maintained by `useToggle */
export interface TogglerSetter {
  /** Toggles the state value between `true` and `false` */
  toggle: () => void;
  /** Sets the state value to `true` */
  setTrue: () => void;
  /** Sets the state value to `false` */
  setFalse: () => void;
}

/**
 * Hook that stores a boolean value, and provides logic for toggling and setting the value.
 *
 * The return value is a tuple with the value, toggler, and a object with the `true` and `false` setters.
 *
 * @param initialValue - Either the initial value or a function that resolves to it for lazy loading.
 *
 * @returns A tuple with the current state, the state toggler, and a object with `true` and `false` setters.
 */
const useToggle = (initialValue: boolean | (() => boolean)): [boolean, TogglerSetter] => {
  const [value, setToggle] = useState(initialValue);

  const setTrue = useFreezedCallback(() => setToggle(true));
  const setFalse = useFreezedCallback(() => setToggle(false));
  const toggle = value ? setFalse : setTrue;

  return [value, { toggle, setTrue, setFalse }];
};

export default useToggle;
