import {useState,useCallback} from 'react';

// validation 담당 minimum 최소 글자 / maximum 최대 글자 
const useValidation =(initialValue = "",minimum,maximum)=>{
    const [value, setValue]=useState<string>(initialValue);
    const [validation , setValidation]= useState<boolean>(false);
    
    const handler =useCallback((e)=>{
        setValue(e.target.value);
        setValidation(e.target.value.length < minimum || e.target.value.length > maximum);
    },[])

    return [value, handler, validation] as const;
};

export default useValidation;