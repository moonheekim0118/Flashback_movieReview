import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { openAlertAction } from '../actions/alert';
import Router from 'next/router';

interface Props {
  done?: boolean;
  error: string;
  redirectPath?: string;
  message?: string;
  time?: number;
}

// 팝업 띄워준다.
// redirectPath를 넣으면 time 초후에 redirect 해준다.

const usePopup = ({
  done = false,
  error,
  redirectPath,
  message,
  time,
}: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (done) {
      // fetch 완료
      dispatch(openAlertAction(message));
      if (redirectPath) {
        const timer = setTimeout(() => Router.replace(redirectPath), time);
        return () => clearTimeout(timer);
      }
    } else if (error) {
      // fetch Error
      dispatch(openAlertAction(error));
    }
  }, [done, error]);
};

export default usePopup;
