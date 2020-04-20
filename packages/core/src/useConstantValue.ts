import { useRef } from 'react';
import { useFreezedCallback } from './useFreezedCallback';

/**
 * Hook to keep a constant state value.
 * It takes an value or a resolver and maintains a reference to it though re-renders.
 *
 * Returns a getter for state value so it can be lazily set.
 *
 * `React.useState` can be used as an alternative although it should be less performing since it relies on reducers.
 *
 * Should the value change based on dependencies consider `React.useMemo`.
 * Should the value be a reference to a function consider `useFreezedCallback`.
 *
 * @param value - Either the state value or its resolver
 * @returns A getter for the state value
 * @typeParam T - Type of the state
 *
 * @public
 */
export const useConstantValue = <T>(value: T | (() => T)): (() => T) => {
  const reference = useRef<{ state: T }>();

  const get = useFreezedCallback(() => {
    if (!reference.current) {
      reference.current = {
        state: typeof value === 'function' ? (value as Function)() : value,
      };
    }

    return reference.current.state;
  });

  return get;
};
