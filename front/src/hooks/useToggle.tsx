import { useState, useCallback} from 'react';

const useToggle=(FirstInitialValue=false, SecondInitialValue=false, ThirdInitialValue=false)=>{
    const [FirstValue, FirstSetter]=useState(FirstInitialValue);
    const [SecondValue, SecondSetter]=useState(SecondInitialValue);
    const [ThirdValue, ThirdSetter]=useState(ThirdInitialValue);
    
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

    return [FirstValue,FirstHandler, SecondValue, SecondHandler, ThirdValue, ThirdHanlder] as const;
}

export default useToggle;