import React, { useCallback } from 'react';
import {
  addMyReviewAction,
  updateMyReviewAction,
} from '../../../actions/review';
import useSelectiong from '../../../hooks/useSelecting';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from '../../Movie/MovieCard';
import Button from '../../../atoms/Buttons';
import styled from 'styled-components';
import useValidation from '../../../hooks/useValidation';
import usePopup from '../../../hooks/usePopup';
import Badge from '../Badge';
import ReviewInput from '../ReviewInput';
import Messages from '../../../util/alertMessages';
import { ReviewList } from '../../../model/ReviewList';
import { Ratings } from '../../../model/Ratings';

interface Props {
  Review: ReviewList;
  ButtonType: string;
}

// rating 넘겨주는 함수
const getRating = (good: boolean, soso: boolean): Ratings => {
  if (good) {
    return Ratings.GOOD;
  } else if (soso) {
    return Ratings.SOSO;
  }
  return Ratings.BAD;
};

const TextEditor = ({ Review, ButtonType }: Props) => {
  const dispatch = useDispatch();

  const [
    shortComment, // 짧은 평
    setShortComment,
    shortCommentError,
  ] = useValidation(Review.shortComment, 5, 20);

  const [
    character, // 기억에 남는 캐릭터
    setCharacter,
    characterError,
  ] = useValidation(Review.character, 5, 50);

  const [
    line, // 기억에 남는 대사
    setLine,
    lineError,
  ] = useValidation(Review.line, 5, 50);

  const [
    scene, // 기억에 남는 장면
    setScene,
    sceneError,
  ] = useValidation(Review.scene, 5, 50);

  const [
    freeComment, // 자유 커멘트
    setFreeComment,
    freeCommentError,
  ] = useValidation(Review.freeComment, 0, 50);

  const [
    goodSelect,
    setGoodSelect,
    sosoSelect,
    setSoSoSelect,
    badSelect,
    setBadSelect,
  ] = useSelectiong(
    Review.rating === Ratings.GOOD,
    Review.rating === Ratings.SOSO,
    Review.rating === Ratings.BAD
  );

  const {
    myReviews,
    addMyReviewDone,
    addMyReviewError,
    updateMyReviewDone,
    updateMyReviewError,
  } = useSelector((state) => state.review);

  // 리뷰 등록시 팝업
  usePopup({
    done: addMyReviewDone,
    error: addMyReviewError,
    redirectPath: `/singleReview/${myReviews[0]?.id}`,
    message: Messages.createReview,
    time: 3000,
  });

  // 리뷰 수정 완료시 팝업
  usePopup({
    done: updateMyReviewDone,
    error: updateMyReviewError,
    redirectPath: `/singleReview/${Review.id}`,
    message: Messages.updateReview,
    time: 3000,
  });

  const onCreate = useCallback(() => {
    // 리뷰 저장
    dispatch(
      addMyReviewAction({
        Movie: Review.Movie,
        rating: getRating(goodSelect, sosoSelect),
        shortComment: shortComment,
        character: character,
        line: line,
        scene: scene,
        freeComment: freeComment,
      })
    );
  }, [
    goodSelect,
    sosoSelect,
    badSelect,
    shortComment,
    character,
    line,
    scene,
    freeComment,
  ]);

  const onUpdate = useCallback(() => {
    // 리뷰 수정
    dispatch(
      updateMyReviewAction({
        id: Review.id,
        User: Review.User,
        Movie: Review.Movie,
        rating: getRating(goodSelect, sosoSelect),
        shortComment: shortComment,
        line: line,
        character: character,
        scene: scene,
        freeComment: freeComment,
      })
    );
  }, [
    goodSelect,
    sosoSelect,
    badSelect,
    shortComment,
    character,
    line,
    scene,
    freeComment,
  ]);

  // 버튼 disabeld 공통 조건
  const disabledRequirements =
    shortCommentError ||
    characterError ||
    lineError ||
    sceneError ||
    freeCommentError ||
    shortComment.length === 0 ||
    character.length === 0 ||
    line.length === 0 ||
    scene.length === 0;

  // 업데이트 버튼 disabeld 조건
  const updateDisabledRequirements =
    shortComment === Review.shortComment &&
    freeComment === Review.freeComment &&
    character === Review.character &&
    line === Review.line &&
    scene === Review.scene;

  return (
    <Container>
      <MovieCard Movie={Review.Movie} />
      <BadgeContainer>
        <Badge
          badgeName={Ratings.GOOD}
          selected={goodSelect}
          onClick={setGoodSelect}
        />
        <Badge
          badgeName={Ratings.SOSO}
          selected={sosoSelect}
          onClick={setSoSoSelect}
        />
        <Badge
          badgeName={Ratings.BAD}
          selected={badSelect}
          onClick={setBadSelect}
        />
      </BadgeContainer>
      <TextContainer>
        <ReviewInput
          name="shortComment"
          label="한 줄평"
          value={shortComment}
          onChange={setShortComment}
          Error={shortCommentError}
          Pass={!shortCommentError && shortComment.length > 0}
        />
        <ReviewInput
          name="character"
          label="기억에 남는 인물과 이유를 적어주세요"
          value={character}
          onChange={setCharacter}
          Error={characterError}
          Pass={!characterError && character.length > 0}
        />
        <ReviewInput
          name="line"
          label="기억에 남는 대사와 이유를 적어주세요"
          value={line}
          onChange={setLine}
          Error={lineError}
          Pass={!lineError && line.length > 0}
        />
        <ReviewInput
          name="scene"
          label="기억에 남는 장면과 이유를 적어주세요"
          value={scene}
          onChange={setScene}
          Error={sceneError}
          Pass={!sceneError && scene.length > 0}
        />
        <ReviewInput
          name="freeComment"
          label="영화에 대한 자유로운 메모"
          value={freeComment}
          onChange={setFreeComment}
          Error={freeCommentError}
          Pass={!freeCommentError && freeComment.length > 0}
        />
      </TextContainer>
      <ButtonWrapper>
        {ButtonType === 'create' ? (
          <Button
            color="purple"
            onClick={onCreate}
            title="저장하기"
            disabled={disabledRequirements}
          />
        ) : (
          <Button
            color="purple"
            onClick={onUpdate}
            title="수정하기"
            disabled={disabledRequirements || updateDisabledRequirements}
          />
        )}
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.section`
  width: 80%;
  margin: auto;
  background-color: inherit;
`;

const TextContainer = styled.article`
  margin-top: 20px;
`;

const ButtonWrapper = styled.article`
  text-align: center;
`;

const BadgeContainer = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  margin-top: 20px;
`;

export default TextEditor;
