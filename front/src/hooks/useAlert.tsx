import { useState, useCallback } from 'react'

const useAlert = (initialValue = false) => {
  const [show, setter] = useState(initialValue);

  const open = useCallback(() => {
     setter(true)
  }, []);

  const close = useCallback(() => {
    setter(false)
  }, []);

  return [show, open, close,setter] as const
}

export default useAlert;