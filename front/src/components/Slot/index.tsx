import React from 'react';
import styled, { keyframes } from 'styled-components';

interface Props {
  reviewsCount: number;
}

// 리뷰 작성 개수에 따른 레벨
const LEVEL = [
  '영화 머글',
  '영화 입문자',
  '영화 볼 줄 아시는 분',
  '완벽한 영화 덕후',
  '영화의 신',
];

const getLevel = (reviewsCount: number): string => {
  if (reviewsCount < 20) {
    return LEVEL[0];
  } else if (reviewsCount < 40) {
    return LEVEL[1];
  } else if (reviewsCount < 70) {
    return LEVEL[2];
  } else if (reviewsCount < 100) {
    return LEVEL[3];
  }
  return LEVEL[4];
};

// 슬롯 컴포넌트
const Slot = ({ reviewsCount }: Props) => {
  let myLevel = getLevel(reviewsCount);

  return (
    <Container>
      <SlotContainer>
        {LEVEL.map((v, i) => (
          <LevelList key={i}>{v}</LevelList>
        ))}
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

const LevelList = styled.div`
  position: absolute;
  top: 50%;
  left: 15%;
  transform: translateXY(-50%, -15%);
  opacity: 0;
  width: 100%;

  &:nth-child(1) {
    animation: ${Animation} 0.5s 0.5s forwards linear alternate;
  }

  &:nth-child(2) {
    animation: ${Animation} 0.5s 1s forwards linear alternate;
  }

  &:nth-child(3) {
    animation: ${Animation} 0.5s 1.5s forwards linear alternate;
  }

  &:nth-child(4) {
    animation: ${Animation} 0.5s 2s forwards linear alternate;
  }

  &:nth-child(5) {
    animation: ${Animation} 0.5s 2.5s forwards linear alternate;
  }
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
