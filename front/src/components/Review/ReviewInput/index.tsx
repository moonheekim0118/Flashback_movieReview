import React from 'react';
import styled from 'styled-components';
import Icon from '../../../atoms/Icons';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
  name: string;
  label: string;
  value: string;
  onChange: (e: any) => void;
  Error: boolean;
  Pass: boolean;
}

const ReviewInput = ({ name, label, value, onChange, Error, Pass }: Props) => {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      {Error && <Icon icon={faTimes} className="faTimes" color={'red'} />}
      {Pass && <Icon icon={faCheck} className="faCheck" color={'green'} />}
      <Input value={value} onChange={onChange} name={name} />
    </>
  );
};

const Label = styled.label`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Input = styled.input.attrs({ type: 'text' })`
  width: 100%;
  padding: 10px 15px;
  font-size: 1.2rem;
  border: none;
  border-bottom: 3px solid #e6b3cc;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin: 15px 0 40px 0;

  transition: 0.2s background-color ease-in-out;
  background-color: inherit;
  color: inherit;

  &:focus {
    background-color: rgba(230, 179, 204, 0.3);
  }
`;

export default ReviewInput;
