import {useState,useCallback} from 'react';
// length validation custom hook

const useValidation =(initialValue = null , minimum, maximum)=>{
    const [value, setValue]=useState(initialValue);
    const [validation , setValidation]= useState(false);
    const handler =useCallback((e)=>{
        setValue(e.target.value);
        setValidation(e.target.value.length < minimum || e.target.value.length > maximum);
    },[])
    return [value, handler, validation] as const;
};

export default useValidation;