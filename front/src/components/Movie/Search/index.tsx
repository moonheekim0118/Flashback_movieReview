import React from 'react';
import styled from 'styled-components';
import Icon from '../../../atoms/Icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface Props {
  value: string;
  onChange: (e: any) => void;
  onSubmit: (e: any) => void;
  placeholder: string;
}

const Search = ({ value, onChange, onSubmit, placeholder }: Props) => {
  return (
    <Container>
      <SearchBox value={value} placeholder={placeholder} onChange={onChange} />
      <SearchIcon>
        <Icon
          size={30}
          icon={faSearch}
          className="faSearch"
          onClick={onSubmit}
        />
      </SearchIcon>
    </Container>
  );
};

const Container = styled.article`
  width: 80%;
  position: relative;
  margin-bottom: 15px;
`;

const SearchBox = styled.input.attrs({ type: 'text' })`
  width: 100%;
  padding: 15px 20px;

  border: 3px solid #e6b3cc;
  border-radius: 25px;
  font-size: 1.2rem;

  background-color: inherit;
  color: inherit;

  box-shadow: 0px 0px 10px -1px rgba(230, 179, 204, 0.75);
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  transform: translateY(-50%);
  border-radius: 50%;
  color: #cc00cc;

  width: 50px;
  height: 50px;

  transition: 0.2s background-color ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: rgba(230, 179, 204, 0.4);
  }
`;

export default Search;
