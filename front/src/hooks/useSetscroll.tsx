import { useEffect } from 'react';
import { throttle } from 'lodash';
import { animateScroll as scroll } from 'react-scroll';
import { getItem, setItem } from '../util/sessionStorage';

// 스크롤 위치 고정 시켜주는 hooks

const useSetscroll = (key: string, title?: string | string[]) => {
  useEffect(() => {
    // movieResult 스크롤링이라면 조건 추가
    if (key === '@movieResult-Scroll') {
      const ExTitle = getItem('@movieResult-title') || '';
      if (ExTitle === title) {
        // 이전에 방문한 페이지라면 스크롤 위치 원상복귀
        const ExScroll = getItem(key) || 0;
        scroll.scrollMore(ExScroll);
      } else {
        // 이전에 방문한 페이지가 아니라면
        setItem('@movieResult-title', title);
      }
    } else {
      const ExScroll = getItem(key) || 0;
      scroll.scrollMore(ExScroll);
    }

    const onScroll = throttle(() => {
      setItem(key, window.pageYOffset);
    }, 500);

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
};

export default useSetscroll;
