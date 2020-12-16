import React, { useEffect } from 'react';
import Router from 'next/router';
import Layout from '../components/Layout';
import { useSelector } from 'react-redux';
import { backUrl } from '../Config/config';
import { Message } from '../components/GlobalStyle';
import useSWR from 'swr';
import axios from 'axios';
import TextEditor from '../components/Review/TextEditor';

const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((result) => result.data);

const WriteReview = () => {
  const singleMovie = useSelector((state) => state.movie.singleMovie);
  // swr로 myInfo 불러오기
  const { data: myInfo, error: myInfoError } = useSWR(
    `${backUrl}/user`,
    fetcher
  );
  let base; // 불러온 정보 저장할 곳

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

  if (myInfoError || !myInfo || !singleMovie) {
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
