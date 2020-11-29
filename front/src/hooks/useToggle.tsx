import { useState, useCallback } from 'react'

interface Props {
  initialValue?:boolean;
}

// 일반 토글 
const useToggle = ({initialValue = false}:Props) => {
  const [value, setter] = useState(initialValue);

  const handler = useCallback(()=>{
      setter(!value);
  },[value]); 

  return [value, handler , setter] as const
}

export default useToggle