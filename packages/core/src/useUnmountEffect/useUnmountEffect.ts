import { useEffect } from 'react';

/**
 * Semantic wrapper on `React.useEffect`.
 * Runs a given cleanup function on unmount time.
 *
 * @public
 * @param effect - Function that is run on unmount time.
 * @param deps - If present, effect will only activate if the values in the list change.
 */
export const useUnmountEffect = (effect: () => void, deps?: any[]) => {
  useEffect(() => effect, [effect, ...(deps || [])]); // eslint-disable-line
};
