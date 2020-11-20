import React , { useCallback }from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { ReviewList } from '../../../model/ReviewList';
import MovieCard from '../../Movie/MovieCard';
import Button from '../../../atoms/Buttons';

interface Props {
    Review?:ReviewList
}

const SingleReview=({Review}:Props)=>{

    const onClick = useCallback(()=>{
        Router.push('/'); // 수정하는 곳 
    },[]);

    return(
        <Container>
            <ButtonContainer>
                <Button 
                title={"수정하기"}
                onClick={onClick}
                />
            </ButtonContainer>
            <MovieCard Movie={Review.movieInfo}/>
            <ReviewContainer>
            <Title>{Review.shortComment}</Title>
            <ContentsContainer>
                <SubTitle>기억에 남는 인물</SubTitle>
                <p>{Review.chracter}</p>
            </ContentsContainer>
            <ContentsContainer>
                <SubTitle>기억에 남는 대사</SubTitle>
                <p>{Review.line}</p>
            </ContentsContainer>
            <ContentsContainer>
                <SubTitle>기억에 남는 장면</SubTitle>
                <p>{Review.scene}</p>
            </ContentsContainer>
            <ContentsContainer>
                <p>{Review.freeComment}</p>
            </ContentsContainer>
            </ReviewContainer>
        </Container>
    );
}

const Container = styled.div`
    width:80%;
    margin:auto;
    position:relative;
`;

const ReviewContainer = styled.div`
    display:flex;
    flex-direction:column;
    margin-top:30px;
`;

const Title = styled.div`
    font-size:2rem;
    font-weight:bold;
    padding-bottom:20px;
    margin-bottom:20px;

    border-bottom:1px solid #e6b3cc;
`;

const SubTitle = styled.div`
    font-size:1.5rem;
    font-weight:bold;
    margin-bottom:10px;
`;

const ContentsContainer = styled.div`
    padding: 10px 0;
    margin-bottom:20px;
`;

const ButtonContainer = styled.div`
    position:absolute;
    top:10px;
    right:10px;
`;

export default SingleReview;