import { useRef } from 'react';
import { GenericFunction } from '../types';

/**
 * Hook that freezed a given callback, so it is only created once in the components life.
 * It ensures the return function is always the same.
 *
 * Useful for optimizations where otherwise constant functions are recalculated every re-render
 *
 * Should the callback ever be recalculated see `React.useCallback` and `React.useMemo`.
 *
 * @param callback - The callback to freeze.
 * @returns The freezed callback.
 * @public
 */
export const useFreezedCallback = <T>(callback: GenericFunction<T>): GenericFunction<T> => {
  const reference = useRef<GenericFunction<T>>();

  if (!reference.current) {
    reference.current = callback;
  }

  return reference.current;
};
