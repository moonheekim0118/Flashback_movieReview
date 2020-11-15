import React ,{ useCallback } from 'react';
import Router from 'next/router'
import Icons from '../../atoms/Icons';
import styled from 'styled-components';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

interface Props {
    PageName?:string;
    children?:any;
}

export default function Layout({ PageName="" , children} : Props){
    
    const onPushBack = useCallback(()=>{
        Router.back();
    },[]);

    return(
        <>
        <Header>
            <div><Icons icon={faChevronLeft} className={"fa-chevron-left"} onClick={onPushBack}/></div>
            <div>{PageName}</div>
        </Header>
        {children}
        </>
    );
}

const Header = styled.header`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;

    width: 100%;
    height: 50px;
    
    color:#cc00cc;
    border-bottom:1px solid #e6b3cc;
    background-color:inherit;
    
`;

