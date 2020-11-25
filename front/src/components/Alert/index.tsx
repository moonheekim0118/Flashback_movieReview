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
    position:fixed;
    left:50%;
    bottom:10%;
    transform:translateX(-50%);

    padding: 25px 15px;
    
    background-color:#cc00cc;
    border-raidus:10px;
    color:#fff;
    font-size:1.2rem;
    box-shadow:0px 0px 11px -1px rgba(0,0,0,0.75);

    z-index:7000;
`;

export default Alert;