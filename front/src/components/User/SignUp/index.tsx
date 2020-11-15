import React , { useCallback , useState } from 'react';
import Button from '../../../atoms/Buttons';
import useInput from '../../../hooks/useInput';
import useValidation from '../../../hooks/useValidation';
import {
Container,
InputContainer,
TextInput,
PasswordInput,
Label,
ErrorMessage
} from '../Login';

const SignUp=()=>{
    
    const [email, setEmail]=useInput();
    const [nickname, setNickname, nicknameLengthError]=useValidation("",2,6);
    const [password, setPassword, passwordLengthError]=useValidation("",6,15);
    const [checkpassword,setCheckpassword]=useState();
    const [passwordError, setPasswordError]=useState(false);


    const onSubmit = useCallback((e)=>{
         e.preventDefault();
    },[]);

    const onChangeCheckPassword = useCallback((e)=>{
         setCheckpassword(e.target.value);
         setPasswordError(e.target.value!==password);
    },[checkpassword]);

    return(
       <Container>
            <InputContainer>
               {nicknameLengthError && <ErrorMessage>닉네임은 2글자 이상 6글자 이하여야 합니다.</ErrorMessage>}
                <Label htmlFor="user-nickname">닉네임</Label>
                <TextInput
                name="user-nickname"
                placeholder="닉네임"
                value={nickname}
                onChange={setNickname}
                />     
           </InputContainer>  
           <InputContainer>
                <Label htmlFor="user-email">이메일</Label>
                <TextInput
                name="user-email"
                placeholder="example@example.com"
                value={email}
                onChange={setEmail}
                />     
           </InputContainer>  
           <InputContainer>
               {passwordLengthError && <ErrorMessage>비밀번호는 6글자 이상 15글자 이하여야 합니다.</ErrorMessage>}
                <Label htmlFor="user-password">비밀번호</Label>
                <PasswordInput
                name="user-password"
                placeholder="6자 이상 15자 이하"
                value={password}
                onChange={setPassword}
                />    
           </InputContainer>  
           <InputContainer>
               {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                <Label htmlFor="user-checkpassword">비밀번호 확인</Label>
                <PasswordInput
                name="user-checkpassword"
                placeholder="비밀번호 확인"
                value={checkpassword}
                onChange={onChangeCheckPassword}
                />     
           </InputContainer> 
           <br/>
           <Button
            fill={true}
            shadow={true}
            disabled={nicknameLengthError || passwordLengthError || passwordError }
            color={"#cc00cc"} 
            onClick={onSubmit}
            title={"회원가입"}
           />
       </Container>
    );
}

export default SignUp;