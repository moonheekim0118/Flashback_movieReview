import { useState, useCallback } from 'react';

// 버튼 3개 토글을 담당
const useSelecting = (
  FirstInitialValue: boolean = false,
  SecondInitialValue: boolean = false,
  ThirdInitialValue: boolean = false
) => {
  const [FirstValue, FirstSetter] = useState<boolean>(FirstInitialValue);
  const [SecondValue, SecondSetter] = useState<boolean>(SecondInitialValue);
  const [ThirdValue, ThirdSetter] = useState<boolean>(ThirdInitialValue);

  const FirstHandler = useCallback(() => {
    FirstSetter(!FirstValue);
    SecondSetter(false);
    ThirdSetter(false);
  }, [FirstValue]);

  const SecondHandler = useCallback(() => {
    FirstSetter(false);
    SecondSetter(!SecondValue);
    ThirdSetter(false);
  }, [SecondValue]);

  const ThirdHanlder = useCallback(() => {
    FirstSetter(false);
    SecondSetter(false);
    ThirdSetter(!ThirdValue);
  }, [ThirdValue]);

  return [
    FirstValue,
    FirstHandler,
    SecondValue,
    SecondHandler,
    ThirdValue,
    ThirdHanlder,
  ] as const;
};

export default useSelecting;
