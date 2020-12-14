import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import Button from '../atoms/Buttons';
import styled from 'styled-components';
import axios from 'axios';
import { END } from 'redux-saga';
import { loadMyInfoAction } from '../actions/user';
import { useSelector } from 'react-redux';
import wrapper from '../store/configureStore';

const index = () => {
  const loginDone = useSelector((state) => state.user.loginDone);

  return (
    <Layout>
      <TitleContainer>
        <Text>간단하게</Text>
        <Text>영화리뷰</Text>
        <Text>플래쉬백</Text>
        <Circle />
      </TitleContainer>
      <ButtonContainer>
        <Link href="/searchMovie">
          <a>
            <Button
              fill={true}
              color={'purple'}
              shadow={true}
              title={'새 리뷰 작성하기'}
            />
          </a>
        </Link>
        {!loginDone && (
          <SignButtons>
            <Link href="/login">
              <a>
                <Button color={'gray'} title={'로그인'} />
              </a>
            </Link>
            <Link href="/signUp">
              <a>
                <Button color={'gray'} title={'회원가입'} />
              </a>
            </Link>
          </SignButtons>
        )}
      </ButtonContainer>
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
    context.store.dispatch(END);
    await context.store['sagaTask'].toPromise();
  }
);

const TitleContainer = styled.div`
  position: absolute;
  top: 30%;
  left: 20%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
    position:absolute;
    left:50%;
    transform:translateX(-50%);
    bottom:25%;
    width:70%;
    margin-auto;
`;

const SignButtons = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
`;

const Text = styled.span`
  margin-bottom: 1rem;
  font-size: 2.7rem;
  color: inherit;
`;

const Circle = styled.div`
  &::after {
    position: absolute;
    left: -15%;
    top: -3%;
    width: 125px;
    height: 125px;

    border-radius: 50%;
    background-color: rgba(204, 0, 204, 0.4);
    content: '';
  }
`;

export default index;
