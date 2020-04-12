import { useState } from 'react';
import { VoidFunction } from './types';
import useFreezedCallback from './useFreezedCallback';

/**
 * Hook for creating a state object with setter that merges the given value into the current state.
 *
 * It also returns as a third value a state resetter, that restores the initial value.
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
