import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { openAlertAction } from '../actions/alert';
import Router from 'next/router';

interface Props {
  done: boolean;
  error: string;
  redirectPath: string;
  message: string;
  time: number;
}

// 팝업 띄워주고 3초 후에 redirectPath로 리다이렉트 해주는 훅스

const usePopup = ({ done, error, redirectPath, message, time }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (done) {
      // fetch 완료
      dispatch(openAlertAction(message));
      const timer = setTimeout(() => Router.replace(redirectPath), time);
      return () => clearTimeout(timer);
    } else if (error) {
      // fetch Error
      dispatch(openAlertAction(error));
    }
  }, [done, error]);
};

export default usePopup;
