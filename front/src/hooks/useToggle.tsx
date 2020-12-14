import { useState, useCallback } from 'react';

// 일반 토글
const useToggle = (initialValue: boolean = false) => {
  const [value, setter] = useState<boolean>(initialValue);

  const handler = useCallback(() => {
    setter(!value);
  }, [value]);

  return [value, handler, setter] as const;
};

export default useToggle;
