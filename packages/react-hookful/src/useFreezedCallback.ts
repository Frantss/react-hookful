import { useRef } from 'react';
import { GenericFunction } from './types';

/**
 * Hook that freezed a given callback, so it is only created once in the components life.
 * It ensures the return value is always the same.
 *
 * Should the callback ever be recalculated use `React.useCallback` or `React.useMemo`.
 *
 * @param callback - The callback to freeze.
 * @returns The freezed callback.
 */
const useFreezedCallback = <T extends GenericFunction>(callback: T): T => {
  const reference = useRef<T>();

  if (!reference.current) {
    reference.current = callback;
  }

  return reference.current;
};

export default useFreezedCallback;
