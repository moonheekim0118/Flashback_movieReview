import { useState, useCallback} from 'react';

interface Props {
    FirstInitialValue?:boolean;
    SecondInitialValue?:boolean;
    ThirdInitialValue?:boolean;
}

// 버튼 3개 토글을 담당
const useSelecting=({FirstInitialValue=false, SecondInitialValue=false, ThirdInitialValue=false}:Props)=>{
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

export default useSelecting;