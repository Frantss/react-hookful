import { useStorage, StorageOptions, StorageValue } from './useStorage';

export const useSessionStorage = <T>(
  key: string,
  defaultValue?: T,
  options?: StorageOptions<T>,
): StorageValue<T> => {
  return useStorage(key, defaultValue, window.localStorage, options);
};
