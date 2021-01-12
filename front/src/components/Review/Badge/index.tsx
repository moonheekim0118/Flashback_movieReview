import React from 'react';
import styled from 'styled-components';
import Icon from '../../../atoms/Icons';
import {
  faThumbsUp,
  faThumbsDown,
  faMehRollingEyes,
} from '@fortawesome/free-solid-svg-icons';
import { Ratings } from '../../../model/Ratings';

interface Props {
  badgeName: Ratings;
  selected: boolean; // 현재 선택되었는지
  onClick?: (e: Event) => void;
}

const BadgeStatus = {
  [Ratings.GOOD]: { icon: faThumbsUp, name: '좋아요!' },
  [Ratings.SOSO]: { icon: faMehRollingEyes, name: '보통이에요' },
  [Ratings.BAD]: { icon: faThumbsDown, name: '별로에요' },
};

// 영화 레이팅 뱃지 컴포넌트
const Badge = ({ badgeName, selected, onClick = null }: Props) => {
  return (
    <Container selected={selected} onClick={onClick}>
      <Icon icon={BadgeStatus[badgeName].icon} className={badgeName} />
      {BadgeStatus[badgeName].name}
    </Container>
  );
};

const Container = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  width: 100px;
  height: 50px;
  padding: 20px 5px;
  border-radius: 5px;
  font-size: 0.8rem;

  background-color: transparent;

  color: ${(props) => (props.selected ? '#cc00cc' : '#e0e0d1')};
  transition: 0.2s background-color ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.selected ? '' : 'rgba(224, 224, 209,0.3)'};
    color: #cc00cc;
  }
`;

export default Badge;
