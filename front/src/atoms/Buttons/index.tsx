import React from 'react';
import styled from 'styled-components';
import { colorCode } from '../../util/color';

interface Props {
  fill?: boolean; // 버튼 크기 100% or not
  shadow?: boolean; // 버튼 has shadow or not
  disabled?: boolean; // 버튼 is disabled or not
  color?: string; // 버튼's color
  onClick?: (e?: React.MouseEvent<HTMLSpanElement>) => void;
  children?: React.ReactChild;
}

const Button = ({
  fill = false,
  shadow = false,
  disabled = false,
  color = 'lightPurple',
  onClick,
  children,
}: Props) => {
  return (
    <ButtonContainer
      filled={fill}
      shadow={shadow}
      onClick={onClick}
      disabled={disabled}
      color={color}>
      {children}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<{
  filled: boolean;
  color: string;
  shadow: boolean;
}>`
  width: ${(props) => (props.filled ? '100%' : '')};
  padding: 10px 15px;

  border: none;
  border-radius: 5px;

  font-size: 1.2rem;
  color: ${(props) => (props.color === 'purple' ? '#fff' : 'black')};
  background-color: ${(props) => colorCode[`${props.color}`]};

  box-shadow: ${(props) =>
    props.shadow ? '0px 0px 11px -1px rgba(0,0,0,0.75)' : ''};
  cursor: pointer;

  transition: 0.2s background-color ease-in-out;

  &:disabled {
    cursor: not-allowed;
    background-color: #e6b3e6;
    color: #fff;
  }
`;

export default Button;
