import {useState,useCallback} from 'react';

interface Props {
    initialValue?:boolean;
    minimum?:number;
    maximum?:number;
}

// validation 담당 minimum 최소 글자 / maximum 최대 글자 
const useValidation =({initialValue = null , minimum, maximum}:Props)=>{
    const [value, setValue]=useState(initialValue);
    const [validation , setValidation]= useState(false);
    
    const handler =useCallback((e)=>{
        setValue(e.target.value);
        setValidation(e.target.value.length < minimum || e.target.value.length > maximum);
    },[])
    
    return [value, handler, validation] as const;
};

export default useValidation;