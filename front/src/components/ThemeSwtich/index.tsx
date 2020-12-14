import React from 'react';
import Switch from 'react-switch';
import styled from 'styled-components';

interface Props {
  checked: boolean;
  onCheck: () => void;
}

// swtich mode
const ThemeSwtich = ({ onCheck, checked }: Props) => {
  return (
    <Container>
      <Switch
        onChange={onCheck}
        checked={checked}
        id="switch"
        height={24}
        width={48}
        offColor="#d9dfe2"
        offHandleColor="#fff"
        onColor="#999"
        onHandleColor="#282c35"
      />
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 2%;
  left: 30%;
  z-index: 7000;
`;
export default ThemeSwtich;
