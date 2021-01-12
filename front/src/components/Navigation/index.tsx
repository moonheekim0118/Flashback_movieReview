import React from 'react';
import Menu from './Menu';
import styled from 'styled-components';

interface Props {
  loginDone: boolean;
}

// 메뉴아이콘 네비게이션
const Navigation = ({ loginDone = false }: Props) => {
  return (
    <Container>
      {loginDone ? (
        <>
          <Menu href="/myInfo" title="내 정보" />
          <Menu href="/myReviews" title="내가 쓴 리뷰" />
        </>
      ) : (
        <>
          <Menu href="/login" title="로그인" />
          <Menu href="/signUp" title="회원가입" />
        </>
      )}
      <Menu href="/searchMovie" title="영화 검색" />
    </Container>
  );
};

const Container = styled.nav`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 20px 0px;
  background-color: inherit;
`;

export default Navigation;
