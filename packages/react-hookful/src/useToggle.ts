import { useState, useCallback } from 'react';
import useFreezedCallback from './useFreezedCallback';

interface TogglerSetter {
  setTrue: () => void;
  setFalse: () => void;
}

/**
 * A simple hook that encapsulates boolean toggling logic.
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
