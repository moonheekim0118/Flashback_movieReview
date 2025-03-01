import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { MovieList } from '../../model/MovieList';
import { removeFavoriteMovieAction } from '../../actions/user';
import Icon from '../../atoms/Icons';
import Slide from './Slide';
import styled from 'styled-components';

interface Props {
  movieLists: Array<MovieList>;
  editMode?: boolean;
}

const Slider = ({ movieLists, editMode = false }: Props) => {
  // 최초 슬라이드 개수
  const initialSlide = Math.ceil(movieLists.length / 5);
  const dispatch = useDispatch();
  const [totalSlides, setTotalSlides] = useState<number>(initialSlide);
  const [currentSlide, setCurrentSlide] = useState<number>(0); // 현재 슬라이드 페이지
  const slideRef = useRef<any>(null);

  useEffect(() => {
    const onResize = () => {
      // 리사이징
      if (window.innerWidth <= 768) {
        // 모바일버전
        setTotalSlides(Math.ceil(movieLists.length / 2));
      } else {
        setTotalSlides(Math.ceil(movieLists.length / 4));
      }
      setCurrentSlide(0); // 리사이징 할 때마다 0으로 돌아오도록 함
    };
    onResize();
    window.addEventListener('resize', onResize); // 화면 크기 바뀔 때 TOTAL_SLIDES 변경
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [movieLists, totalSlides]);

  useEffect(() => {
    // 슬라이드 움직였을 경우 화면 움직여주기
    slideRef.current.style.transition = 'transform 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    // 다음 슬라이드 보여주기 버튼
    if (currentSlide === totalSlides - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  }, [currentSlide, totalSlides]);

  const prevSlide = useCallback(() => {
    // 이전 슬라이드 보여주기 버튼
    if (currentSlide === 0) {
      setCurrentSlide(totalSlides - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  }, [currentSlide, totalSlides]);

  // 특정 영화 삭제
  const onClickRemoveMovie = useCallback((e) => {
    if (e.target.nearestViewportElement) {
      dispatch(removeFavoriteMovieAction(e.target.nearestViewportElement.id));
    }
  }, []);

  return (
    <Container>
      <SliderContainer ref={slideRef} onClick={onClickRemoveMovie}>
        {movieLists.map((v, i) => (
          <Slide
            id={v.id}
            key={v.image}
            imgSrc={v.image}
            title={v.title}
            editMode={editMode}
          />
        ))}
      </SliderContainer>
      {totalSlides > 1 && (
        <>
          <MoveButton direction="left">
            <Icon
              icon={faChevronCircleLeft}
              className="faChevronCircleLeft"
              onClick={prevSlide}
              size={50}
              color="lightPurple"
            />
          </MoveButton>
          <MoveButton direction="right">
            <Icon
              icon={faChevronCircleRight}
              className="faChevronCircleRight"
              onClick={nextSlide}
              size={50}
              color="lightPurple"
            />
          </MoveButton>
        </>
      )}
    </Container>
  );
};

const Container = styled.article`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const SliderContainer = styled.div`
  width: 80%;
  display: flex;
  padding: 10px 25px 25px 25px;
`;

const MoveButton = styled.div<{ direction: string }>`
  position: absolute;
  left: ${(props) => (props.direction === 'left' ? '0' : '')};
  right: ${(props) => (props.direction === 'right' ? '0' : '')};
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
`;

export default Slider;
