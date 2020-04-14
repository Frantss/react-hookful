import { useEffect, useCallback } from 'react';
import useStateObject from './useStateObject';

import { AsyncFunction } from './types';

export interface AsyncFunctionState<T> {
  data: T;
  loading: boolean;
  error: unknown;
}

/**
 * Useful hook for running side effects and monitor their current state.
 * `loading` flag is initialized to `true` and changes to `false` once `asyncFn` has returned.
 *
 * @param asyncFn Async function that will be run .
 * @param args Array of arguments for that `asyncFn` takes.
 * @param dependencies `asyncFn` will run each time the values of this array change.
 *
 * @typeParam T - Return type of `asyncFn`.
 *
 * @returns Object holding the current status (`loading`) and either the resulting data or an error.
 */
const useAsyncFunction = <T>(
  asyncFn: AsyncFunction<T>,
  args: unknown[] = [],
  dependencies: unknown[] = [],
): AsyncFunctionState<T> => {
  const [state, setState] = useStateObject({
    data: null,
    loading: true,
    error: null,
  });

  const runAsyncFn = useCallback(async () => {
    try {
      const data = await asyncFn(...args);
      setState.merge({ data, loading: false });
    } catch (error) {
      setState.merge({ error, loading: false });
    }
  }, dependencies); // eslint-disable-line

  useEffect(() => {
    runAsyncFn();
  }, dependencies); // eslint-disable-line

  return state as AsyncFunctionState<T>;
};

export default useAsyncFunction;
