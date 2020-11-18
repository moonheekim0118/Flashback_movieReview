import React from 'react';
import styled from 'styled-components';
import Icon from '../../../atoms/Icons';
import { faThumbsUp, faThumbsDown, faMehRollingEyes } from '@fortawesome/free-solid-svg-icons';

interface Props {
    badgeName?:string;
    onClick?: (e: React.MouseEvent) => void;
}

const IconName = {
    'GOOD':faThumbsUp,
    'SOSO':faMehRollingEyes,
    'BAD':faThumbsDown,
}

const Status={
    'GOOD':'좋아요!',
    'SOSO':'보통이에요',
    'BAD':'별로에요',
}


const Badge=({ badgeName, onClick=null}: Props)=>{
    return(
        <Container onClick={onClick}>
            <Icon
            icon={IconName[badgeName]}
            className={badgeName}
            
            />
            {Status[badgeName]}
        </Container>
    );
}

const Container = styled.div`
    display:flex;
    justify-content:space-evenly;
    align-items:center;

    width:100px;
    height:50px;
    padding:20px 5px;
    border-radius:5px;
    font-size:0.8rem;

    transition: 0.2s background-color ease-in-out;
    cursor:pointer;

    &:hover{
        background-color:rgba(224, 224, 209,0.3);
    }
`;


export default Badge;