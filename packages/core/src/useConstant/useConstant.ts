import { useRef } from 'react';
import { resolveValue } from '../utils';

/**
 * Keeps a constant state value.
 * It takes an value or a resolver and maintains a reference to it though re-renders.
 *
 * `React.useState` can be used as an alternative although it should be less performing since it relies on reducers.
 *
 * Should the value change based on dependencies consider `React.useMemo`.
 * Should the value be a reference to a function consider `useFreezedCallback`.
 *
 * @public
 * @param value - Value to keep constant
 * @returns Value kept constant
 */
export const useConstant = <T>(value: T | (() => T)): T => {
  const reference = useRef<{ state: T }>();

  if (!reference.current) {
    reference.current = {
      state: resolveValue(value),
    };
  }

  return reference.current.state;
};
