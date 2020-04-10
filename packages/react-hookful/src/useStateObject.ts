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

  const clearState = useFreezedCallback(() => setState(initialState));

  return [state, newSetState, clearState];
};

export default useStateObject;
