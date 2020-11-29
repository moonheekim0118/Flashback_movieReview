import React , { 
       useEffect, 
       useCallback , 
       useState 
} from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { SIGNUP_REQUEST } from '../../../actions/user';
import { OPEN_ALERT } from '../../../actions/alert';
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
    const dispatch = useDispatch();
    const signUpError = useSelector((state)=>state.user.signUpError);
   
    const [email, setEmail]=useInput("");
   
    const [nickname,  // 닉네임 
           setNickname, 
           nicknameLengthError
          ]=useValidation("",2,6);

    const [password, // 비밀번호  
           setPassword, 
           passwordLengthError
          ]=useValidation("",6,15);

    const [checkpassword,setCheckpassword]=useState<string>(""); // 확인용 비밀번호  

    const [passwordError, setPasswordError]=useState<boolean>(false); // 비밀번호 불일치 에러  

    // 회원가입 에러 alert
    useEffect(()=>{ 
         if(signUpError){
              dispatch({type:OPEN_ALERT,data:signUpError});
         }
    },[signUpError]);

    // submit 
    const onSubmit = useCallback((e)=>{
         e.preventDefault();
         dispatch({
              type:SIGNUP_REQUEST,
              data: {email, nickname, password}
         });
         
    },[email,nickname,password,checkpassword]);

    // 비밀번호 변경 
    const onChangeCheckPassword = useCallback((e)=>{
         setCheckpassword(e.target.value); 
         setPasswordError(e.target.value!==password); // 비밀번호가 불일치 할 경우 
    },[password]);

    return(
       <Container>
            <InputContainer>
                <Label htmlFor="user-nickname">닉네임</Label>
                <TextInput
                name="user-nickname"
                placeholder="닉네임"
                value={nickname}
                onChange={setNickname}
                />     
                {nicknameLengthError && <ErrorMessage>닉네임은 2글자 이상 6글자 이하여야 합니다.</ErrorMessage>}
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
                <Label htmlFor="user-password">비밀번호</Label>
                <PasswordInput
                name="user-password"
                placeholder="6자 이상 15자 이하"
                value={password}
                onChange={setPassword}
                />    
               {passwordLengthError && <ErrorMessage>비밀번호는 6글자 이상 15글자 이하여야 합니다.</ErrorMessage>}
           </InputContainer>  
           <InputContainer>
                <Label htmlFor="user-checkpassword">비밀번호 확인</Label>
                <PasswordInput
                name="user-checkpassword"
                placeholder="비밀번호 확인"
                value={checkpassword}
                onChange={onChangeCheckPassword}
                />     
                {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
           </InputContainer> 
           <br/>
           <Button
            fill={true}
            shadow={true}
            disabled={nicknameLengthError || passwordLengthError || passwordError }
            color="purple" 
            onClick={onSubmit}
            title="회원가입"
           />
       </Container>
    );
}

export default SignUp;