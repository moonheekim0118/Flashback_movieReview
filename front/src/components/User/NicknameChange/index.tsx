import React , {  useCallback  } from 'react';
import { useDispatch } from 'react-redux';
import { openAlertAction } from '../../../actions/alert';
import { updateNicknameAction } from '../../../actions/user';
import useValidation from '../../../hooks/useValidation';
import Button from '../../../atoms/Buttons';
import styled from 'styled-components';

interface Props {
    exNickname: string
}
const NicknameChange =({exNickname}:Props)=>{
    const dispatch = useDispatch();

    const [ 
        nickname,  // 닉네임 
        setNickname, 
        nicknameError
    ] = useValidation(exNickname,2,6);

    const onChangeNickname = useCallback((e)=>{ 
        e.preventDefault();
        dispatch(updateNicknameAction({nickname:nickname}))
        dispatch(openAlertAction("닉네임이 변경되었습니다.")); // 확인 alert 
    },[nickname]);

    return(
        <Form>
        <InputContainer>
            <Label>닉네임</Label>
            <Nickname
            value={nickname}
            onChange={setNickname}
            />
            {nicknameError && 
            <ErrorMessage>닉네임은 2글자 이상 6글자 이하여야 합니다.</ErrorMessage> }
        </InputContainer>
        <ButtonContainer>
            <Button
            title="수정"
            onClick={onChangeNickname}
            disabled={nicknameError || nickname===exNickname}
            />
        </ButtonContainer>
    </Form>
    )
};


const Form = styled.form`
    display:flex;
    align-items:center;
    margin:auto;
`;

const InputContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    position:relative;
`;

const Label = styled.label`
    font-size:1rem;
    color:#cc00cc;
`;

const Nickname = styled.input.attrs({type:'text'})`
    width:100%;
    padding: 10px 15px;
    font-size:1.2rem;
    border:none;
    border-bottom:3px solid #e6b3cc;

    background-color:inherit;
    color:inherit;
`;

const ErrorMessage = styled.div`
    width:80%;
    color:#ff3333;
    position:absolute;
    bottom:-40px;
`;

const ButtonContainer = styled.div`
    flex-basis:40%;
`;


export default NicknameChange;