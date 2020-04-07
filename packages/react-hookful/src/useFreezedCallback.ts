import { useCallback } from 'react';

const useFreezedCallback = (fn) => {
  return useCallback(fn, []); // eslint-disable-line
};

export default useFreezedCallback;
