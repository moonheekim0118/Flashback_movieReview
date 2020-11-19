import React , { useCallback } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { SAVE_SINGLE_MOVIE_REQUEST } from '../../../actions/movie';
import { MovieList } from '../../../model/MovieList';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Icon from '../../../atoms/Icons';

interface Props {
    Movie?:MovieList;
    Search?:boolean
}

// 검색창 검색시 해당 영화 리스트 가져오기
const MovieCard=({Movie, Search=false}:Props)=>{
    const dispatch = useDispatch();

    const onSelectMovie=useCallback(()=>{
        dispatch({
            type:SAVE_SINGLE_MOVIE_REQUEST,
            data: Movie
        });    
        Router.push('/writeReview'); // redirect
    },[]);

    return(
        <Container>
            <MoviePoster src={Movie.image}/>
            <MovieDescription>
                <MovieTitle>{Movie.title}</MovieTitle>
                <p>{Movie.director} 감독</p>
                <p> 2019.08 제작</p>
            </MovieDescription>
            {Search &&
            <Selector>
                <Icon
                size={45}
                icon={faPlusCircle}
                onClick={onSelectMovie}
                />
            </Selector>}
        </Container>
    );
}

export const Container = styled.div`
    display:flex;
    align-items:center;
    width:100%;
    height:200px;
    position:relative;
    
    border-bottom:1px solid #f4f4f4; 

    padding: 10px 20px;
    margin-top:20px;
    cursor:pointer;
`;

export const MoviePoster = styled.img`
    width: 150px;
    height: 100%;
    object-fit: scale-down;
    margin-right:20px;
`;

export const MovieDescription = styled.div`
    width:100%;
    height:50%;
    display:flex;
    flex-direction:column;
    justify-content: space-between;
`;

const MovieTitle = styled.p`
    font-size:1.5rem;
    font-weight:bold;
`;

const Selector = styled.div`
    z-index:1000;
    position:absolute;
    bottom:60px;
    right:30px;
`;

export default MovieCard;