import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

interface Props {
    text?:string;
}

// 알림창 
const Alert=({text}:Props)=>{
    const root= document.getElementById('alert-root');
    return(
       ReactDOM.createPortal((
        <Container>
        {text}
        </Container>
       ), root)
    );
}

const Container = styled.div`
    position:absolute;
    left:50%;
    bottom:20%;
    transform:translate(-50%);

    padding: 20px 15px;
    
    background-color:#cc00cc;
    border-raidus:5px;
    color:#fff;
    font-size:1.2rem;

    z-index:7000;
`;

export default Alert;