import { useState, useCallback} from 'react';

interface Props {
    initialValue?:string;
}

// Input 
const useInput= ({initialValue = ""}:Props)=>{
    const [value, setter]=useState(initialValue);
    const handler=useCallback((e) => {
        setter(e.target.value);
    },[])
    return [value,handler,setter] as const; 
}

export default useInput;