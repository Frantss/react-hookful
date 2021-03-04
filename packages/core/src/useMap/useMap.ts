import { useState, useCallback, Dispatch, SetStateAction } from 'react';

/** Setters of the state maintained by `useMap`
 * @public
 */
export interface MapSetter<K = any, V = any> {
  /** Removes all keys from the state */
  clear: () => void;
  /**  Adds a given key/value pair */
  insert: (key: K, value: V) => void;
  /**  Adds or updates a given key/value pair */
  remove: (key: K) => void;
  /** State setter, the same you would get with `React.useState`. */
  set: Dispatch<SetStateAction<Map<K, V>>>;
}

/**
 * Hook for creating an Map with several setters for ease of use.
 *
 * @param initialState - Initial state value.
 * @returns A tuple with the current state, and the setters.
 * @public
 */
export const useMap = <K = any, V = any>(
  initialState: Map<K, V> | (() => Map<K, V>),
): [Map<K, V>, MapSetter<K, V>] => {
  const [state, set] = useState<Map<K, V>>(initialState);

  const clear: MapSetter<K, V>['clear'] = useCallback(() => set(new Map()), [
    set,
  ]);

  const insert: MapSetter<K, V>['insert'] = useCallback(
    (key: K, value: V) => set(currState => currState.set(key, value)),
    [set],
  );

  const remove: MapSetter<K, V>['remove'] = useCallback(
    (key: K) =>
      set(currState => {
        const newState = new Map(currState);
        newState.delete(key);
        return newState;
      }),
    [set],
  );

  return [state, { set, clear, insert, remove }];
};
