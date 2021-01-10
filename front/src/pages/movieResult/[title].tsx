import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { loadMyInfoAction } from '../../actions/user';
import { LoadMovieAction } from '../../actions/movie';
import { openAlertAction } from '../../actions/alert';
import { Message } from '../../components/GlobalStyle';
import { END } from 'redux-saga';
import { scrollHandler } from '../../util/scrollHandler';
import { animateScroll as scroll } from 'react-scroll';
import { setItem, getItem } from '../../util/sessionStorage';
import { throttle } from 'lodash';
import MovieCard from '../../components/Movie/MovieCard';
import axios from 'axios';
import wrapper from '../../store/configureStore';

const MovieResult = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { title } = router.query;
  const { addFavoriteMovieDone, addFavoriteMovieError } = useSelector(
    (state) => state.user
  );
  const { movieLists, loadMoviesLoading, hasMoreMovies } = useSelector(
    (state) => state.movie
  );

  // 스크롤 위치 유지
  useEffect(() => {
    const ExTitle = getItem('@movieResult-title') || '';
    if (ExTitle === title) {
      // 이전에 방문한 페이지라면 스크롤 위치 원상복귀
      const ExScroll = getItem('@movieResult-Scroll') || 0;
      scroll.scrollMore(ExScroll);
    } else {
      // 이전에 방문한 페이지가 아니라면
      setItem('@movieResult-title', title);
    }

    const onScroll = throttle(() => {
      setItem('@movieResult-Scroll', window.pageYOffset);
    }, 500);

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // 인피니트 스크롤링
    const start = movieLists.length + 1; // 다음 스타트 지점
    // onScroll 함수 적용
    const onScroll = scrollHandler(
      dispatch.bind(null, LoadMovieAction({ title: title, start: start })),
      hasMoreMovies,
      loadMoviesLoading
    );
    // 이벤트 리스너 등록
    window.addEventListener('scroll', onScroll);
    return () => {
      // 이벤트 리스너 해제
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMoreMovies, loadMoviesLoading, movieLists]);

  // 인생영화 추가 후 alert
  useEffect(() => {
    if (addFavoriteMovieDone) {
      // 정상적으로 추가
      dispatch(openAlertAction('인생영화로 추가되었습니다.'));
    } else if (addFavoriteMovieError) {
      // 에러
      dispatch(openAlertAction(addFavoriteMovieError));
    }
  }, [addFavoriteMovieDone, addFavoriteMovieError]);

  return (
    <Layout PageName={`${title} 검색결과`}>
      {movieLists &&
        movieLists.map((v, i) => (
          <MovieCard key={v.link} Movie={v} Search={true} />
        ))}
      {movieLists.length === 0 && (
        <Message>{`${title} 검색결과가 없습니다!`}</Message>
      )}
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch(loadMyInfoAction());
    context.store.dispatch(
      LoadMovieAction({ title: context.params.title, start: 1 })
    );
    context.store.dispatch(END);
    await context.store['sagaTask'].toPromise();
  }
);

export default MovieResult;
