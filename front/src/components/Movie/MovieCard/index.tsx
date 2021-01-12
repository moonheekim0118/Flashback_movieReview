import React, { useCallback } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { SaveMovieAction } from '../../../actions/movie';
import { addFavoriteMovieAction } from '../../../actions/user';
import { MovieList } from '../../../model/MovieList';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import useToggle from '../../../hooks/useToggle';
import styled from 'styled-components';
import Icon from '../../../atoms/Icons';
import Tooltip from '../../Tooltip';
import Card from '../../Card';

interface Props {
  Movie: MovieList;
  Search?: boolean; // 현재 SearchResult인지 아닌지 구분
}

// 영화 정보 띄워주는 MovieCard
const MovieCard = ({ Movie, Search = false }: Props) => {
  const dispatch = useDispatch();

  const [showTooltip, setShowTooltip] = useToggle(); // 툴팁 토글
  const loginDone = useSelector((state) => state.user.loginDone);

  const onWriteReview = useCallback(() => {
    // 리뷰 작성할 영화 선택-> 리뷰 작성페이지로 리당렉트
    dispatch(SaveMovieAction(Movie)); // 리뷰 작성할 영화 저장
    Router.push(`/writeReview`); // redirect
  }, []);

  const onAddFavorite = useCallback(() => {
    // 인생영화로 등록
    dispatch(addFavoriteMovieAction(Movie));
    setShowTooltip(); // 툴팁 닫기
  }, [showTooltip]);

  // 툴팁에 들어갈 Buttonlist
  const ButtonList = [
    { title: '인생영화 등록', onClick: onAddFavorite },
    { title: '리뷰 작성', onClick: onWriteReview },
  ];

  const description = (
    <>
      <MovieTitle>{Movie.title}</MovieTitle>
      <MovieInfo>{Movie.director} 감독</MovieInfo>
      <MovieInfo>{Movie.pubDate} 제작</MovieInfo>
    </>
  );

  const option = (
    <>
      {Search && loginDone && (
        <Selector>
          <Icon
            size={45}
            icon={faPlusCircle}
            className="faPlusCircle"
            onClick={setShowTooltip}
          />
        </Selector>
      )}
      {Search && loginDone && showTooltip && (
        <Tooltip onClose={setShowTooltip} buttonList={ButtonList} />
      )}
    </>
  );

  return (
    <Card
      posterSrc={Movie.image}
      descriptionChild={description}
      optionChild={option}
    />
  );
};

const MovieTitle = styled.p`
  width: 75%;
  font-size: 1.5rem;
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const MovieInfo = styled.p`
  width: 70%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Selector = styled.div`
  position: absolute;
  bottom: 60px;
  right: 30px;
`;

export default MovieCard;
