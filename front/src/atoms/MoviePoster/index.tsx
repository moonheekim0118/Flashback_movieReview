import React from 'react';
import styled from 'styled-components';

interface Props {
  src: string;
  width?: number;
  fit?: boolean;
}

const MoviePoster = ({ src, width = 150, fit = false }: Props) => {
  return <Container src={src} width={width} fit={fit} alt="movie-poster" />;
};

const Container = styled.img<{ width: number; fit: boolean }>`
  width: ${(props) => `${props.number}px`};
  height: ${(props) => (props.fit ? '' : '100%')};
  object-fit: ${(props) => (props.fit ? 'fit' : 'scale-down')};
`;

export default MoviePoster;
