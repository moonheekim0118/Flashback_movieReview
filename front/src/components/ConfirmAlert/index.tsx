import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

interface Props {
    text:string; // 알림창 메시지 
    clickYes:(e: any) => void; // 알림창에서 yes를 눌렀을 때 
    clickNo:(e: any) => void; // 알림차에서 No를 눌렀을 때 
}

// 확인 알림창
const ConfirmAlert=({text, clickYes, clickNo}:Props)=>{
    const root= document.getElementById('alert-root');
    
    return(
       ReactDOM.createPortal((
        <>
        <Overaly onClick={clickNo}/>
        <Container>
            <TextContainer>{text}</TextContainer>
            <ButtonContainer>
                <Button title="remove" id="submit" onClick={clickYes}>삭제</Button>
                <Button title="cancle" id="close" onClick={clickNo}>취소</Button>
            </ButtonContainer>
        </Container>
        </>
       ), root)
    );
}

const Overaly = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 8000;

  background-color: rgba(0, 0, 0, 0.3);
`


const Container = styled.div`
    display:flex;
    flex-direction:column;
    position:fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width:310px;
    height:150px;
    
    background-color:${props => props.theme.colors.bgColor};
    color:${props => props.theme.colors.fontColor};
    border-raidus:10px;
    border: 1px solid #e0e0d1;
    font-size:1.2rem;

    z-index:9000;
`;

const TextContainer = styled.div`
    width:100%;
    height:65%;
    padding: 30px 0;
    text-align:center;
    border-bottom: 1px solid #e0e0d1;
`;
const ButtonContainer = styled.div`
    height:35%;
    width:100%;
`;

const Button = styled.button<{ title: string }>`
    border: none;
    border-right:${(props)=>props.title==='remove' ? '1px solid #e0e0d1;' : 'none'};
    width:50%;
    background-color:inherit;
    padding: 17px 10px;
    color:${(props)=>props.title==='remove' ? 'red' : 'green'};
    font-weight:bold;
    font-size:1rem;

    cursor:pointer;

    &:hover{
        background-color:#e0e0d1;
    }
`;

export default ConfirmAlert;