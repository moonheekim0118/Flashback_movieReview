import React from 'react';
import styled from 'styled-components';
import { ReviewList } from '../../../model/ReviewList';
import Icon from '../../../atoms/Icons';
import { Container,MoviePoster,MovieDescription } from '../../Movie/MovieCard';
import { faThumbsUp, faThumbsDown, faMehRollingEyes } from '@fortawesome/free-solid-svg-icons';

interface Props {
    Review?:ReviewList
}

const IconName = {
    'GOOD':faThumbsUp,
    'SOSO':faMehRollingEyes,
    'BAD':faThumbsDown,
}

const RatingText = {
    'GOOD':'좋아요',
    'SOSO':'보통이에요',
    'BAD':'별로에요'
}


const Preview=({Review}:Props)=>{
    const Rating = RatingText[Review.rating];
    return(
        <Container>
            <MoviePoster src={Review.movieInfo.image}/>
            <MovieDescription>
                <Comment>{Review.shortComment}</Comment>
                <RatingContainer>
                    <Icon
                    icon={IconName[Review.rating]}
                    color={"lightPurple"}
                    />
                    <p>{Rating}</p>
                </RatingContainer>
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