import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import styled from 'styled-components';

const Navigation=()=>{
    const loginDone=useSelector((state)=>state.user.loginDone);

    return(
        <Container>
            {loginDone ? <Link href="/myInfo"><ATag><Menu>내 정보</Menu></ATag></Link> : 
            <Link href="/login"><ATag><Menu>로그인</Menu></ATag></Link> }
            {loginDone ? <Link href="/myReviews"><ATag><Menu>내가 쓴 리뷰</Menu></ATag></Link> :
            <Link href="/signUp"><ATag><Menu>회원가입</Menu></ATag></Link>}
            <Link href="/searchMovie"><ATag><Menu>영화 검색</Menu></ATag></Link>
        </Container>
    );
}

const Container = styled.div`
    display:flex;
    flex-direction:column;
    text-align:center;
    padding:20px 0px;
    background-color:inherit;

`;

const Menu = styled.div`
    padding:20px;
    border-bottom:1px solid #e0e0d1;
    font-size:1.5rem;

    transition: 0.2s background-color ease-in-out;
    cursor:pointer;

    &:hover{
        background-color:#e0e0d1;
        color:black;
    }
    
`;

const ATag = styled.a`
    text-decoration:none;
`;
export default Navigation;