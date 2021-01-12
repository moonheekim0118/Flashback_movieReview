import React from 'react';
import styled from 'styled-components';

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
      <MoviePoster src={posterSrc} alt="movie poster" />
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

const MoviePoster = styled.img`
  width: 150px;
  height: 100%;
  object-fit: scale-down;
  margin-right: 20px;
`;

const MovieDescription = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default Card;
