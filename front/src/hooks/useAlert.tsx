import { useState, useCallback } from 'react'

// Alert open과 close를 담당 
const useAlert = (initialValue = false) => {
  const [show, setter] = useState<boolean>(initialValue);

  const open = useCallback(() => {
     setter(true)
  }, []);

  const close = useCallback(() => {
    setter(false)
  }, []);

  return [show, open, close,setter] as const
}

export default useAlert;