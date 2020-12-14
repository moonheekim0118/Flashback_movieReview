import React from 'react';
import styled from 'styled-components';

// buttons types
interface buttons {
  title: string;
  onClick: (e: any) => void;
}

interface Props {
  onClose: (e: any) => void;
  buttonList: Array<buttons>;
}

// 툴팁
const Tooltip = ({ onClose, buttonList }: Props) => {
  return (
    <>
      <Overaly onClick={onClose} className="overaly" />
      <Container>
        {buttonList.map((v, i) => (
          <ItemContainer key={v.title + i} className="item" onClick={v.onClick}>
            <Item>{v.title}</Item>
          </ItemContainer>
        ))}
      </Container>
    </>
  );
};

const Overaly = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 500;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 30px;
  top: 15px;
  width: 180px;

  font-size: 1.2rem;
  background-color: #cc00cc;
  box-shadow: 0px 0px 11px -1px rgba(0, 0, 0, 0.75);

  z-index: 1000;
`;

const ItemContainer = styled.div`
  cursor: pointer;
  transition: 0.2s background-color ease-in-out;

  &:hover {
    background-color: #e6b3cc;
  }
`;

const Item = styled.div`
  padding: 10px 20px;
`;

export default Tooltip;
