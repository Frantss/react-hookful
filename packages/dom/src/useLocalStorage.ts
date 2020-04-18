import useStorage, { StorageOptions } from './useStorage';

const useLocalStorage = <T>(key: string, defaultValue?: T, options?: StorageOptions<T>) => {
  return useStorage(key, defaultValue, options);
};

export default useLocalStorage;
