import { useEffect, useCallback } from 'react';
import { useStateObject } from '../useStateObject';

import { AsyncFunction } from '../types';

/**
 * @public
 */
export interface AsyncFunctionState<T> {
  data?: T;
  loading: boolean;
  error?: any;
}

/**
 * Useful hook for running side effects and monitor their current state.
 * `loading` flag is initialized to `true` and changes to `false` once `asyncFn` has returned.
 *
 * @public
 * @param asyncFn - Async function that will be run .
 * @param args - Array of arguments for that `asyncFn` takes.
 * @param dependencies - `asyncFn` will run each time the values of this array change.
 * @returns Object holding the current status (`loading`) and either the resulting data or an error.
 */
export const useAsyncFunction = <T>(
  asyncFn: AsyncFunction<T>,
  args: unknown[] = [],
  dependencies: unknown[] = [],
): AsyncFunctionState<T> => {
  const [state, setState] = useStateObject<AsyncFunctionState<T>>({
    data: undefined,
    loading: true,
    error: undefined,
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

  return state;
};
