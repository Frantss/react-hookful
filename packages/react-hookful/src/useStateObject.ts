import { useState } from 'react';
import { VoidFunction } from './types';
import useFreezedCallback from './useFreezedCallback';

/**
 *
 * @param initialState - Initial state value.
 * @returns A tuple with the current state, the state setter, and a state reset.
 */
const useStateObject = <T>(initialState: T): [T, (arg: object) => void, VoidFunction] => {
  const [state, setState] = useState(initialState);

  const newSetState = useFreezedCallback((newState: object) =>
    setState(prevState => ({ ...prevState, ...newState })),
  );

  const resetState = useFreezedCallback(() => setState(initialState));

  return [state, newSetState, resetState];
};

export default useStateObject;
