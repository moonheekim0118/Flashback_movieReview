import React , { useCallback } from 'react';
import styled from 'styled-components';
import Button from '../../../atoms/Buttons';
import useInput from '../../../hooks/useInput';


const Login=()=>{

    const [email, setEmail]=useInput();
    const [password, setPassword]=useInput();
    
    const onSubmit = useCallback((e)=>{
        e.preventDefault();
    },[]);

    return(
       <Container>
           <InputContainer>
                <Label htmlFor="user-email">이메일</Label>
                <TextInput
                name="user-email"
                value={email}
                placeholder="example@example.com"
                onChange={setEmail}
                />     
           </InputContainer>  
           <InputContainer>
                <Label htmlFor="password">비밀번호</Label>
                <PasswordInput
                 name="user-password"
                 value={password}
                 placeholder="비밀번호 입력"
                 onChange={setPassword}
                />     
                
           </InputContainer>  
           <br/>
           <Button
            fill={true}
            shadow={true}
            color={"#cc00cc"} 
            onClick={onSubmit}
            title={"로그인"}
           />
       </Container>
    );
}


export const Container = styled.form`
    width:75%;
    height:100%;
    text-align:center;
    margin:40px auto;
    padding-top:70px;
    
`;

export const InputContainer = styled.div`
    position:relative;
    padding-bottom:50px;
`;

export const TextInput = styled.input.attrs({type:'text'})`
    width:100%;
    padding: 10px 15px;
    margin-top: 15px;

    font-size:1.2rem;
`;

export const PasswordInput = styled.input.attrs({type:'password'})`
    width:100%;
    padding: 10px 15px;
    margin-top: 15px;

    font-size:1.2rem;
`;

export const Label = styled.label`
    position:absolute;
    top:-15px;
    font-size:1.2rem;
`;

export const ErrorMessage = styled.span`
    color:red;
    position:absolute;
    bottom:25px;
    font-size:1rem;
`;

export default Login;