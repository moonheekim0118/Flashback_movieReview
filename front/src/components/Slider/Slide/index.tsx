import React from 'react';
import styled from 'styled-components';
import Icon from '../../../atoms/Icons';
import MoviePoster from '../../../atoms/MoviePoster';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
  imgSrc: string;
  title: string;
  editMode: boolean;
  onClick: (e: any) => void;
}

const Slide = ({ imgSrc, title, editMode, onClick }: Props) => {
  return (
    <Container>
      <MoviePoster src={imgSrc} width={110} fit={true} />
      <MovieTitle>{title}</MovieTitle>
      {editMode && (
        <CloseButton>
          <Icon
            icon={faTimes}
            className="faTimes"
            onClick={onClick}
            color="red"
            size={30}
          />
        </CloseButton>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 20px;
`;

const MovieTitle = styled.div`
  margin-top: 10px;
  font-weight: bold;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  text-align: center;

  transition: 0.2s background-color ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

export default Slide;
