import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeAlertAction } from '../../actions/alert';
import Alert from '../../components/Alert';
import Header from '../../components/Header';
import styled from 'styled-components';

interface Props {
  PageName?: string;
  children?: React.ReactNode;
}

const Layout = ({ PageName = '', children = null }: Props) => {
  const dispatch = useDispatch();
  const { showAlert } = useSelector((state) => state.alert);
  const loginDone = useSelector((state) => state.user.loginDone);

  useEffect(() => {
    if (showAlert) {
      // Alert 띄워주는 요청이 들어오면 5초 후에 닫아준다.
      const timer = setTimeout(() => dispatch(closeAlertAction()), 5000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <App>
      <Alert />
      {PageName && <Header PageName={PageName} loginDone={loginDone} />}
      {children}
    </App>
  );
};

const App = styled.main`
  min-height: 100vh;
  width: 767px;
  margin: auto;
  position: relative;

  background-color: ${(props) => props.theme.colors.bgColor};
  color: ${(props) => props.theme.colors.fontColor};

  @media screen and (max-width: 414px) {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    width: 375px;
  } ;
`;

export default Layout;
