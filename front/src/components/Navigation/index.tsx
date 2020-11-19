import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Navigation=()=>{
    return(
        <Container>
            <Menu>내 정보</Menu>
            <Link href="/myReviews"><ATag><Menu>내가 쓴 리뷰</Menu></ATag></Link>
            <Link href="/searchMovie"><ATag><Menu>영화 검색</Menu></ATag></Link>
        </Container>
    );
}

const Container = styled.div`
    display:flex;
    flex-direction:column;
    text-align:center;
    padding:20px 0px;
`;

const Menu = styled.div`
    padding:20px;
    border-bottom:1px solid #e0e0d1;
    font-size:1.5rem;

    transition: 0.2s background-color ease-in-out;
    cursor:pointer;

    &:hover{
        background-color:#e0e0d1;
    }
    
`;

const ATag = styled.a`
    text-decoration:none;
`;
export default Navigation;