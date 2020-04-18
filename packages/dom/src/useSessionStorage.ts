import useStorage, { StorageOptions } from './useStorage';

const useSessionStorage = <T>(key: string, defaultValue?: T, options?: StorageOptions<T>) => {
  return useStorage(key, defaultValue, options);
};

export default useSessionStorage;
