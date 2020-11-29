import { useState, useCallback } from 'react'

interface Props {
  initialValue?:boolean;
}

// Alert open과 close를 담당 
const useAlert = ({initialValue = false}:Props) => {
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