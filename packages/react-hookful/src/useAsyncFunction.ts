import { useEffect, useCallback } from 'react';
import useStateObject from './useStateObject';

export default function useAsyncFunction(fn, args = [], dependencies = []) {
  const [state, setState] = useStateObject({
    result: null,
    isLoading: true,
    error: null
  });

  const runFn = useCallback(async () => {
    setState({ loading: true });
    try {
      const result = await fn(...args);
      setState({ result, isLoading: false });
    } catch (error) {
      setState({ error, isLoading: false });
    }
  }, dependencies); // eslint-disable-line

  useEffect(() => {
    runFn();
  }, dependencies); // eslint-disable-line

  return state;
}
