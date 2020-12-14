import { useState, useCallback } from 'react';

// Input
const useInput = (initialValue: string = '') => {
  const [value, setter] = useState<string>(initialValue);

  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);
  return [value, handler, setter] as const;
};

export default useInput;
