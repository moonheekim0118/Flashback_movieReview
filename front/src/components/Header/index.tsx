import React, { useCallback } from 'react';
import Icons from '../../atoms/Icons';
import styled from 'styled-components';
import Router from 'next/router';
import { faChevronLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import Logout from '../User/Logout';

interface Props {
  PageName: string;
  loginDone: boolean;
}

const header = ({ PageName, loginDone }: Props) => {
  const onPushBack = useCallback(() => {
    Router.back();
  }, []);

  const onPushMenu = useCallback(() => {
    Router.push('/menu');
  }, []);

  return (
    <Header>
      <div>
        <Icons
          icon={faChevronLeft}
          className="faChevronLeft"
          onClick={onPushBack}
        />
      </div>
      <PageInfo>
        <PageDescription>{PageName}</PageDescription>
        {PageName === '메뉴' && loginDone ? (
          <Logout />
        ) : (
          <Icons
            icon={faBars}
            onClick={onPushMenu}
            className="faBars"
            color="lightPurple"
          />
        )}
      </PageInfo>
    </Header>
  );
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 50px;
  padding: 0px 20px;

  position: sticky;
  top: 0;

  color: #cc00cc;
  border-bottom: 1px solid #e6b3cc;
  background-color: inherit;

  z-index: 2000;
`;

const PageInfo = styled.div`
  max-width: 700px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  overflow: ellipsis;

  @media screen and (max-width: 768px) {
    max-width: 190px;
  } ;
`;

const PageDescription = styled.div`
  width: 100%;
  margin-right: 20px;
`;

export default header;
