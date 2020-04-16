import { useState, useEffect } from 'react';

const useStorageValue = <T>(
  key: string,
  defaultValue?: T,
  storage: Storage = window.localStorage,
): [T | undefined, (arg: T) => void] => {
  const [value, setValue] = useState(() => {
    const currentValue = storage.getItem(key);
    return currentValue ? (JSON.parse(currentValue) as T) : defaultValue;
  });

  const newSetValue = (newValue: T) => {
    storage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  useEffect(() => {
    const handleOnStorageChange = (e: StorageEvent) => {
      if (e.storageArea !== storage || e.key !== key) return;
      setValue(e.newValue ? JSON.parse(e.newValue) : defaultValue);
    };

    window.addEventListener('storage', handleOnStorageChange);

    return () => window.removeEventListener('storage', handleOnStorageChange);
  }, []);

  return [value, newSetValue];
};

export default useStorageValue;
