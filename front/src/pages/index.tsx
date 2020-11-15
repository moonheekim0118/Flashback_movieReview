import React , { useCallback } from 'react';
import Layout from '../components/Layout';
import Button from '../atoms/Buttons';
import styled from 'styled-components';

export default function index(){

    const onClickReview =useCallback(()=>{

    },[]);
    return(
        <Layout>
            <TitleContainer>
                <Text>영리하게</Text>
                <Text>영화리뷰</Text>
                <Text>영──리</Text>
                <Circle/>
            </TitleContainer>
            <ButtonContainer>
                <Button 
                fill={true} 
                color={"#cc00cc"}
                shadow={true}
                onClick={onClickReview}
                title={"새 리뷰 작성하기"}
                />
                <SignButtons>
                    <Button 
                    fill={false} 
                    color={"#e0e0d1"}
                    onClick={onClickReview}
                    title={"로그인"}
                    />
                    <Button 
                    fill={false} 
                    color={"#e0e0d1"}
                    onClick={onClickReview}
                    title={"회원가입"}
                    />
                </SignButtons>
            </ButtonContainer>
        </Layout>
    );
}

const TitleContainer = styled.div`
    position:absolute;
    top:30%;
    left:20%;
    transform:translateY(-50%); 
    display:flex;
    flex-direction:column;
`;

const ButtonContainer = styled.div`
    position:absolute;
    left:50%;
    transform:translateX(-50%);
    bottom:25%;
    width:70%;
    margin-auto;
`;

const SignButtons = styled.div`
    margin-top:25px;
    display:flex;
    justify-content:space-between;
`;

const Text = styled.span`
    margin-bottom:1rem;
    font-size:2.7rem;
    color:inherit;
`;

const Circle = styled.div`
    &::after{
        position:absolute;
        left:-15%;
        top:-3%;
        width:125px;
        height:125px;
       
        border-radius:50%;
        background-color:rgba(204, 0, 204,0.4);
        content:"";
    }
`;