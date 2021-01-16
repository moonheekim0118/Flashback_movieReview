import { useState, useCallback } from 'react';

const useSessionStorage = (key: string, initialValue = '') => {
  const [storedValue, setSotredValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      setSotredValue(value);
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return [storedValue, setValue];
};

export default useSessionStorage;
