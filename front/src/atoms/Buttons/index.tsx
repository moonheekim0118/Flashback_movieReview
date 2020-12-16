import React from 'react';
import styled from 'styled-components';
import { colorCode } from '../../util/color';

interface Props {
  fill?: boolean; // 버튼 크기 100% or not
  shadow?: boolean; // 버튼 has shadow or not
  disabled?: boolean; // 버튼 is disabled or not
  color?: string; // 버튼's color
  onClick?: (e?: Event) => void;
  title: string;
}

const Button = ({
  fill = false,
  shadow = false,
  disabled = false,
  color = 'lightPurple',
  onClick = null,
  title,
}: Props) => {
  return (
    <ButtonContainer
      fill={fill.toString()}
      shadow={shadow.toString()}
      color={color}
      onClick={onClick}
      disabled={disabled}>
      {title}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<{ fill: string; color: string }>`
  width: ${(props) => (props.fill === 'true' ? '100%' : '')};
  padding: 10px 15px;

  border: none;
  border-radius: 5px;

  font-size: 1.2rem;
  color: ${(props) => (props.color === 'purple' ? '#fff' : 'black')};
  background-color: ${(props) => colorCode[`${props.color}`]};

  box-shadow: ${(props) =>
    props.shadow === 'true' ? '0px 0px 11px -1px rgba(0,0,0,0.75)' : ''};
  cursor: pointer;

  transition: 0.2s background-color ease-in-out;

  &:disabled {
    cursor: not-allowed;
    background-color: #e6b3e6;
    color: #fff;
  }
`;

export default Button;
