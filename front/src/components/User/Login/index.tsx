import React , { useCallback } from 'react';
import styled from 'styled-components';
import Button from '../../../atoms/Buttons';
import useInput from '../../../hooks/useInput';


const Login=()=>{

    const [email, setEmail]=useInput("");
    const [password, setPassword]=useInput("");
    
    const onSubmit = useCallback((e)=>{
        e.preventDefault();
    },[email,password]);

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
            disabled={email.length===0 || password.lenght===0}
            color={"purple"} 
            onClick={onSubmit}
            title={"로그인"}
           />
       </Container>
    );
}


export const Container = styled.form`
    width:75%;
    height:100%;
    margin:40px auto;
    padding-top:70px;
    
`;

export const InputContainer = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    padding-bottom:50px;
`;

export const TextInput = styled.input.attrs({type:'text'})`
    width:100%;
    padding: 10px 15px;
    font-size:1.2rem;
`;

export const PasswordInput = styled.input.attrs({type:'password'})`
    width:100%;
    padding: 10px 15px;
    margin-top: 15px;

    font-size:1.2rem;
`;

export const Label = styled.label`
    font-size:1.2rem;
`;

export const ErrorMessage = styled.span`
    color:red;
    padding-top:10px;
    font-size:1rem;
`;

export default Login;