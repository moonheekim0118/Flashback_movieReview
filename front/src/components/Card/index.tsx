import React from 'react';
import styled from 'styled-components';
import MoviePoster from '../../atoms/MoviePoster';

interface Props {
  onClick?: (e: any) => void;
  posterSrc: string;
  alertChild?: React.ReactNode;
  descriptionChild: React.ReactNode;
  optionChild?: React.ReactNode;
}

const Card = ({
  onClick,
  posterSrc,
  alertChild,
  descriptionChild,
  optionChild,
}: Props) => {
  return (
    <Container onClick={onClick}>
      {alertChild}
      <MoviePoster src={posterSrc} />
      <MovieDescription>{descriptionChild}</MovieDescription>
      {optionChild}
    </Container>
  );
};

const Container = styled.article`
  display: flex;
  align-items: center;
  width: 100%;
  height: 200px;
  position: relative;

  border-bottom: 1px solid #f4f4f4;

  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
`;

const MovieDescription = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;
`;

export default Card;
