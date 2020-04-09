import { useEffect, useCallback } from 'react';
import useStateObject from './useStateObject';

import { AsyncFunction } from './types';

export interface IAsyncFunctionState<T> {
  data: T;
  loading: boolean;
  error: any;
}

/**
 * Useful hook for running side effects and monitor their current state.
 * `loading` flag is initialized to `true` and changes to `false` once `asyncFn` has returned.
 *
 * @param asyncFn Async function that will be run .
 * @param args Array of arguments for that `asyncFn` takes.
 * @param dependencies `asyncFn` will run each time the values of this array change.
 *
 * @returns Object holding the current status (`loading`) and either the resulting data or an error.
 */
const useAsyncFunction = <T, R>(
  asyncFn: AsyncFunction<R>,
  args: any[] = [],
  dependencies: any[] = [],
): IAsyncFunctionState<T> => {
  const [state, setState] = useStateObject<IAsyncFunctionState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const runAsyncFn = useCallback(async () => {
    try {
      const data = await asyncFn(...args);
      setState({ data, loading: false });
    } catch (error) {
      setState({ error, loading: false });
    }
  }, dependencies); // eslint-disable-line

  useEffect(() => {
    runAsyncFn();
  }, dependencies); // eslint-disable-line

  return state;
};

export default useAsyncFunction;
