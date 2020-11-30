import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';


// 알림창 
const Alert=()=>{
    const { message, showAlert } = useSelector((state)=>state.alert);
    // showAlert 상태일때만 띄워준다. 

    return(
        <>
            {showAlert&&
            <Container>
                {message}
            </Container>}
        </>
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