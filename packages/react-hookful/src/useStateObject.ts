import { useState } from 'react';
import useFreezedCallback from './useFreezedCallback';

const useStateObject = initialState => {
  const [state, setState] = useState(initialState);

  const newSetState = useFreezedCallback(newState =>
    setState(prevState => ({ ...prevState, ...newState }))
  );

  const clearState = useFreezedCallback(() => setState(initialState));

  return [state, newSetState, clearState];
};

export default useStateObject;
