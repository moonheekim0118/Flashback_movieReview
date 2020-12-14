import React ,{ useCallback , useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeAlertAction } from '../../actions/alert';
import { faChevronLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Router from 'next/router'
import Alert from '../../components/Alert';
import Icons from '../../atoms/Icons';
import styled from 'styled-components';
import Logout from '../User/Logout';

interface Props {
    PageName?:string;
    children?:React.ReactNode;
}

const Layout=({ PageName="" , children=null } : Props)=>{
    const dispatch = useDispatch();
    const { showAlert } = useSelector((state)=>state.alert);
    const loginDone = useSelector(state=>state.user.loginDone);
  
    const onPushBack = useCallback(()=>{
        Router.back();
    },[]);

    useEffect(()=>{
        if(showAlert){ // Alert 띄워주는 요청이 들어오면 5초 후에 닫아준다.
            const timer = setTimeout(()=>dispatch(closeAlertAction()),5000);
            return()=>clearTimeout(timer);
        }
    },[showAlert]);

    // 페이지 네임이 메뉴인경우에는 로그아웃 버튼을 띄워주고 그 외에 경우에는 메뉴 아이콘을 띄워준다. 
    const MainButton = 
    PageName ==='메뉴' && loginDone ? 
    <Logout/> : 
    <Link href="/menu">
        <a>
            <Icons 
            icon={faBars} 
            className="faBars" 
            color="lightPurple"/>
        </a>
    </Link> ;
    
    return(
        <App>
            <Alert/>
            {PageName &&         
            <Header>
                <div>
                    <Icons 
                    icon={faChevronLeft}
                    className="faChevronLeft"
                    onClick={onPushBack}/>
                </div>
                <PageInfo>
                    <PageDescription>{PageName}</PageDescription>
                    {MainButton}
                </PageInfo>
            </Header>}
            {children}
        </App>
    );
}

const App = styled.div`
    min-height: 100vh;
    width:767px;
    margin:auto;
    position:relative;
    
    background-color:${props => props.theme.colors.bgColor};
    color:${props => props.theme.colors.fontColor};

    @media screen and (max-width:414px){
        width: 100%;
    };

    @media screen and (max-width:768px){
        width: 375px;
    };

`;
const Header = styled.header`
    display:flex;
    justify-content:space-between;
    align-items:center;

    width: 100%;
    height: 50px;
    padding:0px 20px;

    position:sticky;
    top: 0;  
    
    color:#cc00cc;
    border-bottom:1px solid #e6b3cc;
    background-color:inherit;

    z-index:2000;
    
`;

const PageInfo = styled.div`
    max-width:700px;
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    overflow:ellipsis;

    @media screen and (max-width:768px){
        max-width: 190px;
    };
`;

const PageDescription = styled.div`
    width:100%;
    margin-right:20px;
`;

export default Layout;