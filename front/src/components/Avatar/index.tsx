import React from 'react';
import { useSelector } from 'react-redux';
import { backUrl } from '../../Config/config';
import styled from 'styled-components';

interface Props {
    size?:number;
}

// 유저 아바타, 사이즈 조정 가능 profilePic이 있으면 profilePic으로, 없으면 닉네임으로 아바타 띄워준다.
const Avatar=({size=50}:Props)=>{

    const myInfo = useSelector((state)=>state.user.myInfo);

    return(
        <Container size={size}>
            {myInfo.profilePic? 
            <Image src={`${backUrl}/${myInfo.profilePic}`}/> : 
            <Nickname size={size}>{myInfo.nickname[0]}</Nickname>}
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
    object-fit:cover;
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