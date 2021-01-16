import { useState, useCallback } from 'react';

const useLocalStorage = (key: string, initialValue = '') => {
  const [storedValue, setSotredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      setSotredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return [storedValue, setValue];
};

export default useLocalStorage;
