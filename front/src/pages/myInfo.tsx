import React, { useEffect } from 'react';
import Router from 'next/router';
import Layout from '../components/Layout';
import Slider from '../components/Slider';
import Info from '../components/User/Info';
import Icon from '../atoms/Icons';
import useToggle from '../hooks/useToggle';
import usePopup from '../hooks/usePopup';
import styled from 'styled-components';
import { faCog, faEye } from '@fortawesome/free-solid-svg-icons';
import { loadMyInfoAction, loadFavoriteMovieAction } from '../actions/user';
import { useSelector } from 'react-redux';
import { Message } from '../components/GlobalStyle';
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../store/configureStore';

const MyInfo = () => {
  const {
    myInfo,
    loginDone,
    favoriteMovies,
    removeFavoriteMovieDone,
    removeFavoriteMovieError,
  } = useSelector((state) => state.user);
  const [editMode, setEditMode] = useToggle();

  useEffect(() => {
    if (!loginDone) {
      // 로그인 안되어있는 경우
      Router.replace('/login');
    }
  }, []);

  usePopup({
    done: removeFavoriteMovieDone,
    error: removeFavoriteMovieError,
    message: '삭제되었습니다.',
  });

  if (!myInfo) {
    return (
      <Layout PageName="내 정보">
        <Message>다시 로그인 해주세요.</Message>
      </Layout>
    );
  }
  return (
    <Layout PageName="내 정보">
      <Info myInfo={myInfo} />
      {favoriteMovies && (
        <FavoriteMovieContainer>
          <Mode>
            {editMode ? (
              <Icon
                icon={faEye}
                className="faEye"
                color="lightPurple"
                size={30}
                onClick={setEditMode}
              />
            ) : (
              <Icon
                icon={faCog}
                className="faCog"
                color="lightPurple"
                size={30}
                onClick={setEditMode}
              />
            )}
          </Mode>
          <Slider movieLists={favoriteMovies} editMode={editMode} />
        </FavoriteMovieContainer>
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
    context.store.dispatch(loadFavoriteMovieAction());
    context.store.dispatch(END);
    await context.store['sagaTask'].toPromise();
  }
);

const FavoriteMovieContainer = styled.section`
  position: relative;
`;
const Mode = styled.article`
  position: absolute;
  right: 30px;
  top: -10px;
  cursor: pointer;
`;

export default MyInfo;
