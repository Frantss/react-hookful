import { useStorage, StorageOptions, StorageValue } from './useStorage';

export const useLocalStorage = <T>(
  key: string,
  defaultValue?: T,
  options?: StorageOptions<T>,
): StorageValue<T> => {
  return useStorage(key, defaultValue, options);
};
