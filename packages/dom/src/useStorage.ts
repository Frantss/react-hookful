import { useRef } from 'react';

export interface StorageOptions<T> {
  override?: boolean;
  storage?: Storage;
  parser?: (arg: string | null) => T | null;
  serializer?: (arg: T | null) => string;
}

export interface StorageValue<T> {
  get: () => T | null;
  set: (value: T | null) => boolean;
  error?: DOMException;
}

const useStorage = <T>(
  key: string,
  defaultValue: T | null = null,
  {
    override = false,
    storage = window.localStorage,
    parser = JSON.parse as (arg: string | null) => T,
    serializer = JSON.stringify,
  }: StorageOptions<T> = {
    override: false,
    storage: window.localStorage,
    parser: JSON.parse as (arg: string | null) => T,
    serializer: JSON.stringify,
  },
): StorageValue<T> => {
  const value = useRef<T | null>();
  const valueError = useRef<DOMException>();

  if (value.current === undefined) {
    const currentValue = storage.getItem(key);

    if (override || !currentValue) {
      try {
        storage.setItem(key, serializer(defaultValue));
        value.current = defaultValue;
      } catch (error) {
        valueError.current = error;
      }
    } else {
      value.current = parser(currentValue);
    }
  }

  const set = (newValue: T | null) => {
    try {
      storage.setItem(key, serializer(newValue));
      value.current = newValue;
    } catch (error) {
      valueError.current = error;
      return false;
    }
    return true;
  };

  const get = (): T | null => {
    value.current = parser(storage.getItem(key));
    return value.current;
  };

  return { get, set, error: valueError.current };
};

export default useStorage;
