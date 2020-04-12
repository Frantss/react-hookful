import { useState, useCallback } from 'react';
import useFreezedCallback from './useFreezedCallback';

export interface TogglerSetter {
  setTrue: () => void;
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
const useToggle = (
  initialValue: boolean | (() => boolean),
): [boolean, () => void, TogglerSetter] => {
  const [toggle, setToggle] = useState(initialValue);

  const setTrue = useFreezedCallback(() => setToggle(true));
  const setFalse = useFreezedCallback(() => setToggle(false));

  const toggler = useCallback(() => {
    setToggle(!toggle);
  }, [toggle]);

  return [toggle, toggler, { setTrue, setFalse }];
};

export default useToggle;
