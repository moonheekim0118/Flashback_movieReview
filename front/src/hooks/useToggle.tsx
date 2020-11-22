import { useState, useCallback } from 'react'

const useToggle = (initialValue = false) => {
  const [value, setter] = useState(initialValue);

  const handler = useCallback(()=>{
      setter(!value);
  },[value]); 

  return [value, handler , setter] as const
}

export default useToggle