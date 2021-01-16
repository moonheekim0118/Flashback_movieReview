import { useEffect } from 'react';
import { throttle } from 'lodash';
import { animateScroll as scroll } from 'react-scroll';
import Keys from '../util/storageKeys';
import useSessionStorage from './useSessionStorage';

// 스크롤 위치 고정 시켜주는 hooks

const useSetscroll = (key: Keys, title?: string | string[]) => {
  const [ExTitle, setExTitle] = useSessionStorage(Keys.exMovieTitle);
  const [ExScroll, setExScroll] = useSessionStorage(key);

  useEffect(() => {
    // movieResult 스크롤링이라면 조건 추가
    if (key === Keys.movieResultScroll) {
      if (ExTitle === title) {
        // 이전에 방문한 페이지라면 스크롤 위치 원상복귀
        scroll.scrollTo(ExScroll || 0);
      } else {
        // 이전에 방문한 페이지가 아니라면
        setExTitle(title);
      }
    } else {
      scroll.scrollTo(ExScroll || 0);
    }

    const onScroll = throttle(() => {
      setExScroll(window.pageYOffset);
    }, 500);

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
};

export default useSetscroll;
