import { useState } from 'react';
import { useFreezedCallback } from './useFreezedCallback';
import { resolveValue } from './utils';

export interface CounterSetter {
  set: (value: number | ((prev: number) => number)) => void;
  inc: (value?: number) => void;
  dec: (value?: number) => void;
  reset: () => void;
}

export const useCounter = (initialValue: number | (() => number)): [number, CounterSetter] => {
  const [value, set] = useState(initialValue);

  const inc = useFreezedCallback((increment = 1): void =>
    set((prevValue: number) => prevValue + increment),
  );

  const dec = useFreezedCallback((decrement = 1): void =>
    set((prevValue: number) => prevValue - decrement),
  );

  const reset = useFreezedCallback((): void => set(resolveValue(initialValue)));

  return [value, { set, inc, dec, reset }];
};
