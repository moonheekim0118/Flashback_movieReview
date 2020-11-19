import { useState, useCallback} from 'react';

const useToggle= ()=>{
    const [FirstValue, FirstSetter]=useState(false);
    const [SecondValue, SecondSetter]=useState(false);
    const [ThirdValue, ThirdSetter]=useState(false);
    
    const FirstHandler=useCallback(()=>{
        FirstSetter(!FirstValue);
        SecondSetter(false);
        ThirdSetter(false);
    },[FirstValue]);

    const SecondHandler=useCallback(()=>{
        FirstSetter(false);
        SecondSetter(!SecondValue);
        ThirdSetter(false);
    },[SecondValue]);

    const ThirdHanlder=useCallback(()=>{
        FirstSetter(false);
        SecondSetter(false);
        ThirdSetter(!ThirdValue);
    },[ThirdValue]);

    return [FirstValue,FirstHandler, SecondValue, SecondHandler, ThirdValue, ThirdHanlder];
}

export default useToggle;