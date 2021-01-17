import React, { useCallback } from 'react';
import Router from 'next/router';
import { ReviewList } from '../../../model/ReviewList';
import { Ratings } from '../../../model/Ratings';
import { MyInfo } from '../../../model/MyInfo';
import styled from 'styled-components';
import Badge from '../Badge';
import ReviewContents from '../ReviewContents';
import MovieCard from '../../Movie/MovieCard';
import Avatar from '../../Avatar';
import Button from '../../../atoms/Buttons';

interface Props {
  Review: ReviewList;
  myInfo: MyInfo;
}

const SingleReview = ({ Review, myInfo }: Props) => {
  // 수정버튼 클릭시 수정 페이지로 넘어감
  const onClickButton = useCallback(() => {
    Router.push(`/updateReview/${Review.id}`);
  }, [Review]);

  return (
    <Container>
      <ButtonContainer>
        {myInfo && myInfo.id === Review.User.id && (
          <Button onClick={onClickButton}>수정하기</Button>
        )}
      </ButtonContainer>
      <MovieCard Movie={Review.Movie} />
      <ReviewContainer>
        <TitleContainer>
          <Title>{Review.shortComment}</Title>
          <Info>
            <Author>
              <Avatar />
              <Nickname>{Review.User.nickname} 작성</Nickname>
            </Author>
            <Badge badgeName={Ratings[Review.rating]} selected={true} />
          </Info>
        </TitleContainer>
        <ReviewContents
          title="기억에 남는 인물"
          description={Review.character}
        />
        <ReviewContents title="기억에 남는 대사" description={Review.line} />
        <ReviewContents title="기억에 남는 장면" description={Review.scene} />
        <ReviewContents description={Review.freeComment} />
      </ReviewContainer>
    </Container>
  );
};

const Container = styled.article`
  width: 80%;
  margin: auto;
  position: relative;
  background-color: inherit;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const TitleContainer = styled.div`
  padding-bottom: 20px;
  margin-bottom: 20px;

  display: flex;
  flex-direction: column;

  border-bottom: 1px solid #e6b3cc;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
`;

const Nickname = styled.p`
  margin-left: 20px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0px;
  right: 10px;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default SingleReview;
