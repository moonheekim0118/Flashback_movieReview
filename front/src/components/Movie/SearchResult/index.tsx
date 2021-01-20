import React, { useCallback } from 'react';
import Router from 'next/router';
import styled from 'styled-components';

interface Props {
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}

// 영화 검색시 연관검색어 결과물 보여주는 컴포넌트
const SearchResult = ({ onClick, children }: Props) => {
  return <Container onClick={onClick}>{children}</Container>;
};

const Container = styled.div`
  width: 100%;
  padding: 15px 20px;
  font-size: 1.2rem;

  border-radius: 5px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  transition: 0.2s background-color ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #e0e0d1;
    color: black;
  }
`;

export default SearchResult;
