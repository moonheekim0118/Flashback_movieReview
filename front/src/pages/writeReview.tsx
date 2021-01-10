import React, { useEffect } from 'react';
import Router from 'next/router';
import Layout from '../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { loadMyInfoAction } from '../actions/user';
import { Message } from '../components/GlobalStyle';
import TextEditor from '../components/Review/TextEditor';

const WriteReview = () => {
  const dispatch = useDispatch();
  const singleMovie = useSelector((state) => state.movie.singleMovie);
  const myInfo = useSelector((state) => state.user.myInfo);

  let base; // 불러온 정보 저장할 곳

  useEffect(() => {
    dispatch(loadMyInfoAction());
    window.scrollTo(0, 0); // 이전 페이지에서 이동되어있던 스크롤 복구
  }, []);

  // 새로고침 시 영화 정보가 사라지므로, 경고창을 띄운다.
  useEffect(() => {
    function leaveAlert(event: Event) {
      event.returnValue = false;
    }
    window.addEventListener('beforeunload', leaveAlert); //새로고침 이벤트

    return () => {
      window.removeEventListener('beforeunload', leaveAlert);
    };
  }, []);

  // 영화 정보가 사라져있다면 이전 페이지로 돌려보낸다.
  useEffect(() => {
    if (!singleMovie) {
      Router.back();
    }
  }, [singleMovie]);

  if (!myInfo || !singleMovie) {
    return (
      <Layout PageName="리뷰작성">
        <Message>잠시후에 다시 시도해주세요.</Message>
      </Layout>
    );
  } else {
    base = {
      id: '',
      Movie: singleMovie,
      User: { id: myInfo.id, nickname: myInfo.nickname },
      shortComment: '',
      line: '',
      character: '',
      scene: '',
      freeComment: '',
      rating: 'GOOD',
    };
  }

  return (
    <Layout PageName="리뷰작성">
      <TextEditor Review={base} ButtonType={'create'} />
    </Layout>
  );
};

export default WriteReview;
