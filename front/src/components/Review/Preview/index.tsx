import React , { useCallback } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import Badge from '../Badge';
import { ReviewList } from '../../../model/ReviewList';
import { Container,MoviePoster,MovieDescription } from '../../Movie/MovieCard';

interface Props {
    Review?:ReviewList
}

const Preview=({Review}:Props)=>{
    const onClick = useCallback(()=>{
        Router.push(`/singleReview/${Review.id}`);
    },[]);

    return(
        <Container onClick={onClick}>
            <MoviePoster src={Review.movieInfo.image}/>
            <MovieDescription>
                <Comment>{Review.shortComment}</Comment>
                <Badge badgeName={Review.rating} selected={true}/>
            </MovieDescription>
        </Container>
    );
}

const Comment = styled.div`
    font-size:1.5rem;
    font-weight:bold;
`;

const RatingContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-evenly;
    width:100px;
`;


export default Preview;