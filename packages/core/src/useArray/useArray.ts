import { useCallback, useState } from 'react';
import { resolveValue } from '../utils';

/**
 * @public
 * Setters for the state maintained by `useArray`
 */
export interface ArraySetter<T> {
  /**  Sets the state, the same you would get with `React.useState`. */
  set: React.Dispatch<React.SetStateAction<T[]>>;
  /** Appends an element to the state */
  append: (element: T) => void;
  /** Prepends an element to the state */
  prepend: (element: T) => void;
  /** Removes and returns the last element from the state */
  pop: () => T;
  /** Removes and returns the first element from the state */
  shift: () => T;
  /** Concatenates a given array to the state */
  concat: (elements: T[]) => void;
  /** Allows you to transform each element of the state, with the same API as `Array.prototype.map` */
  transform: (
    callbackfn: (value: T, index: number, array: T[]) => T,
    thisArg?: any,
  ) => void;
  /** Like `Array.prototype.filter` */
  filter: (
    predicate: (value: T, index: number, array: T[]) => boolean,
    thisArg?: any,
  ) => void;
  /** Resets the state back to the initial value */
  reset: () => void;
  /** Sets the state to `[]` */
  clear: () => void;
}

/**
 * Hook for creating an array with several setters for ease of use.
 *
 * @public
 * @param initialState - Initial state value
 */
export const useArray = <T>(
  initialState: T[] | (() => T[]),
): [T[], ArraySetter<T>] => {
  const [state, set] = useState(initialState);

  const append: ArraySetter<T>['append'] = useCallback(
    (element: T) => set(current => [...current, element]),
    [set],
  );

  const prepend: ArraySetter<T>['prepend'] = useCallback(
    (element: T) => set(current => [element, ...current]),
    [set],
  );

  const concat: ArraySetter<T>['concat'] = useCallback(
    (elements: T[]) => set(current => [...current, ...elements]),
    [set],
  );

  const shift: ArraySetter<T>['shift'] = useCallback(() => {
    let result: T = state[0];

    set(([head, ...tail]) => {
      result = head;
      return tail;
    });

    return result;
  }, [set, state]);

  const pop: ArraySetter<T>['pop'] = useCallback(() => {
    let result: T = state.slice(-1)[0];

    set(current => {
      result = current.slice(-1)[0];
      return current.slice(0, -1);
    });

    return result;
  }, [set, state]);

  const transform: ArraySetter<T>['transform'] = useCallback(
    (callback, thisArg) => {
      set(current => current.map(callback, thisArg));
    },
    [set],
  );

  const filter: ArraySetter<T>['filter'] = useCallback(
    (callback, thisArg) => {
      set(current => current.filter(callback, thisArg));
    },
    [set],
  );

  const clear: ArraySetter<T>['clear'] = useCallback((): void => set([]), [
    set,
  ]);

  const reset: ArraySetter<T>['reset'] = useCallback(
    (): void => set(resolveValue(initialState)),
    [set, initialState],
  );

  return [
    state,
    {
      set,
      append,
      prepend,
      pop,
      transform,
      filter,
      shift,
      concat,
      reset,
      clear,
    },
  ];
};
