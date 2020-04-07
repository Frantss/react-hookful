import { useEffect } from 'react';

const useEffectOnce = fn => {
  useEffect(fn, []); // eslint-disable-line
};

export default useEffectOnce;
