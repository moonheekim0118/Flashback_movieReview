import React from 'react';
import styled from 'styled-components';

interface Props {
    nickname?:string;
    imgSrc?:string;
    size?:number;
}

// 유저 아바타
const Avatar=({nickname, imgSrc="", size=40}:Props)=>{

    return(
        <Container size={size}>
            {imgSrc? <Image src={imgSrc}/> : <Nickname size={size}>{nickname[0]}</Nickname>}
        </Container>
    );
}

const Container = styled.div<{ size:number }>`
    width:${(props)=>`${props.size}px`};
    height:${(props)=>`${props.size}px`};
`;

const Image = styled.img`
    width:100%;
    height:100%;
    border-radius:100%;
    oveflow:hidden;
    object-fit:fill;
`;

const Nickname=styled.div<{ size:number }>`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    text-align:center;
    width:100%;
    height:100%;
    border-radius:100%;
    overflow:hidden;
    font-size:${(props)=>`${props.size-20}px`};
    color:#fff;
    background-color:#e0e0d1;
`;

export default Avatar;