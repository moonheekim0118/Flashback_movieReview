import React , { useCallback } from 'react';
import Router from 'next/router';
import styled from 'styled-components';

interface Props {
    movieName?:string;
}

// 영화 검색시 연관검색어 결과물 보여주는 컴포넌트  
const SearchResult=({movieName}:Props)=>{

    // 해당 연관검색어 클릭시, 해당 영화 검색 페이지로 리다이렉트 
    const onClick=useCallback(()=>{
        Router.push(`/movieResult/${movieName}`);
    },[]);
    
    return(
        <Container onClick={onClick}>
        {movieName}
        </Container>
    );
}

const Container=styled.div`
    width:100%;
    padding:15px 20px;
    font-size:1.2rem;

    border-radius:5px;

    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;

    transition: 0.2s background-color ease-in-out;
    cursor:pointer;

    &:hover{
        background-color:#e0e0d1;
        color:black;
    }

`;


export default SearchResult;