import React , { useCallback } from 'react';
import Router from 'next/router';
import styled from 'styled-components';

interface Props {
    movieName?:string;
}

// onClick 시 해당 movieName 검색 창으로 보내주기

const SearchResult=({movieName}:Props)=>{

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