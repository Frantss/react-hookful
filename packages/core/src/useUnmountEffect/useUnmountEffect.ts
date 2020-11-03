import { useEffect } from 'react';

/**
 * Semantic wrapper on `React.useEffect`.
 * Runs a given cleanup function on unmount time.
 *
 * @public
 * @param effect - Function that is run on unmount time.
 */
export const useUnmountEffect = (effect: () => void) => {
  useEffect(() => effect, []); // eslint-disable-line
};
