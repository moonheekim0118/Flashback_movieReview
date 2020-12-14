import React from 'react';
import styled, { keyframes } from 'styled-components';

interface Props {
  reviewsCount: number;
}

const LEVEL = [
  // 리뷰 작성 개수에 따른 레벨
  '영화 머글',
  '영화 입문자',
  '영화 볼 줄 아시는 분',
  '완벽한 영화 덕후',
  '영화의 신',
];

// 슬롯 컴포넌트
const Slot = ({ reviewsCount }: Props) => {
  let myLevel;

  if (reviewsCount < 20) {
    myLevel = LEVEL[0];
  } else if (reviewsCount < 40) {
    myLevel = LEVEL[1];
  } else if (reviewsCount < 70) {
    myLevel = LEVEL[2];
  } else if (reviewsCount < 100) {
    myLevel = LEVEL[3];
  } else {
    myLevel = LEVEL[4];
  }

  return (
    <Container>
      <SlotContainer>
        <First>{LEVEL[0]}</First>
        <Second>{LEVEL[1]}</Second>
        <Third>{LEVEL[2]}</Third>
        <Fourth>{LEVEL[3]}</Fourth>
        <Fifth>{LEVEL[4]}</Fifth>

        <MyLevel>{myLevel}</MyLevel>
      </SlotContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: inherit;
  color: inherit;
`;

const Animation = keyframes`
    0%{
        opacity:1;
        margin-bottom:-20px;
    }
    50%{
        margin-top:-30px;
    }
    100%{
        display:none;
        opacity:0;
        margin-top:-50px;
    }
`;

const LastAnimation = keyframes`
    0%{
        opacity:0;
        margin-bottom:-20px;
    }
    50%{
        margin-top:-30px;
    }
    100%{
        opacity:1;
        margin-top:-15px;
    }
`;

const SlotContainer = styled.div`
  width: 75%;
  font-size: 2.5rem;
  position: relative;
  padding-top: 25px;
`;

const First = styled.div`
  position: absolute;
  top: 50%;
  left: 15%;
  transform: translateXY(-50%, -15%);
  width: 100%;

  opacity: 0;
  animation: ${Animation} 0.5s 0.5s forwards linear alternate;
`;

const Second = styled.div`
  position: absolute;
  top: 50%;
  left: 15%;
  transform: translateXY(-50%, -15%);
  opacity: 0;
  width: 100%;

  animation: ${Animation} 0.5s 1s forwards linear alternate;
`;

const Third = styled.div`
  position: absolute;
  top: 50%;
  left: 15%;
  transform: translateXY(-50%, -15%);
  opacity: 0;
  width: 100%;

  animation: ${Animation} 0.5s 1.5s forwards linear alternate;
`;

const Fourth = styled.div`
  position: absolute;
  top: 50%;
  left: 15%;
  transform: translateXY(-50%, -15%);
  opacity: 0;
  width: 100%;

  animation: ${Animation} 0.5s 2s forwards linear alternate;
`;

const Fifth = styled.div`
  position: absolute;
  top: 50%;
  left: 15%;
  transform: translateXY(-50%, -15%);
  opacity: 0;
  width: 100%;

  animation: ${Animation} 0.5s 2.5s forwards linear alternate;
`;

const MyLevel = styled.div`
  position: absolute;
  top: 50%;
  left: 15%;
  transform: translateXY(-50%, -15%);
  opacity: 0;
  width: 100%;

  animation: ${LastAnimation} 0.5s 3s forwards linear alternate;
`;

export default Slot;
