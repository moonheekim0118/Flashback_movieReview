import React from 'react';
import styled from 'styled-components';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import { colorCode } from '../../util/color';

interface Props {
  size?: number; // 사이즈
  icon: FontAwesomeIconProps['icon']; //아이콘
  className: string;
  color?: string; // 색상
  id?: string;
  onClick?: (e?: React.MouseEvent<HTMLSpanElement>) => void;
}

const Icon = ({
  size = 24,
  icon,
  className,
  color = 'purple',
  id,
  onClick,
}: Props) => {
  return (
    <StyledIcon
      iconsize={size}
      icon={icon}
      className={className}
      color={color}
      id={id}
      onClick={onClick}
    />
  );
};

const StyledIcon = styled<{ iconsize: number; color: string }>(FontAwesomeIcon)`
  width: ${(props) => props.iconsize}px;
  height: ${(props) => props.iconsize}px;
  font-size: ${(props) => props.iconsize}px;
  color: ${(props) => colorCode[`${props.color}`]};
  cursor: pointer;

  transition: 0.2s color ease-in-out;
`;

export default Icon;
