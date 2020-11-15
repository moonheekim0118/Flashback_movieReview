import { useState, useCallback} from 'react';

const useInput= (initialValue = null)=>{
    const [value, setter]=useState(initialValue);
    const handler=useCallback((e) => {
        setter(e.target.value);
    },[])
    return [value,handler,setter];
}

export default useInput;