import React , { useEffect,useCallback } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { LOGIN_REQUEST } from '../../../actions/user';
import { OPEN_ALERT } from '../../../actions/alert';
import styled from 'styled-components';
import Button from '../../../atoms/Buttons';
import useInput from '../../../hooks/useInput';


const Login=()=>{
    const dispatch = useDispatch();
    const loginError = useSelector((state)=>state.user.loginError);
    const [email, setEmail]=useInput(""); // 이메일 
    const [password, setPassword]=useInput(""); // 패스워드 
    
    useEffect(()=>{ // 로그인 에러 alert 
        if(loginError){
            dispatch({type:OPEN_ALERT, data:loginError});
        }    
    },[loginError]);

    // submit 
    const onSubmit = useCallback((e)=>{
        e.preventDefault();
        dispatch({
            type:LOGIN_REQUEST,
            data:{ email, password }
        });
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
            disabled={email.length===0 || password.length===0}
            color="purple"
            onClick={onSubmit}
            title="로그인"
           />
            <br/>
       </Container>
    );
}


export const Container = styled.form`
    width:75%;
    margin:0 auto;
    padding-top:80px;
    background-color:inherit;
    color:inherit;
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
    margin-top: 15px;
    border: 1px solid ${props => props.theme.colors.fontColor};
    background-color:inherit;
    color:inherit;
`;

export const PasswordInput = styled.input.attrs({type:'password'})`
    width:100%;
    padding: 10px 15px;
    margin-top: 15px;
    border: 1px solid ${props => props.theme.colors.fontColor};
    background-color:inherit;
    color:inherit;
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