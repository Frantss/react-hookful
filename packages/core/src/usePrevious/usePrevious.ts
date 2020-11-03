import { useEffect, useRef } from 'react';

/**
 * Keeps track of the previous state of a given variable.
 * It initializes to `undefined`.
 *
 * @public
 * @param value - Value to keep track of
 * @returns Previous value
 */
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
