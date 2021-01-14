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
import useSetscroll from '../../hooks/useSetscroll';
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

  useSetscroll('@movieResult-Scroll', title);

  useEffect(() => {
    // 인피니트 스크롤링
    const start = movieLists.length + 1; // 다음 스타트 지점

    // onScroll 조건 함수
    const predicate = () => {
      return hasMoreMovies && !loadMoviesLoading;
    };

    // onScroll 함수 적용
    const onScroll = scrollHandler(
      dispatch.bind(null, LoadMovieAction({ title: title, start: start })),
      predicate
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
