import React , { useCallback , useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { MyInfo } from '../../../model/MyInfo';
import { UPDATE_NICKNAME_REQUEST } from '../../../actions/user';
import useValidation from '../../../hooks/useValidation';
import useAlert from '../../../hooks/useAlert';
import Button from '../../../atoms/Buttons';
import Alert from '../../Alert';
import Logout from '../Logout';
import styled from 'styled-components';

interface Props {
    myInfo?:MyInfo
}

// 닉네임 수정 
const Info=({myInfo} : Props)=>{
    const dispatch = useDispatch();
    const updateNicknameDone= useSelector((state)=>state.user.updateNicknameDone);
    const [nickname, setNickname, nicknameError] = useValidation(myInfo.nickname,2,6);
    const [showAlert, openAlert, closeAlert ] = useAlert();

    useEffect(()=>{
        if(updateNicknameDone){
            openAlert();
            const timer = setTimeout(closeAlert,2000);
            return ()=>{
                clearTimeout(timer);
            }
        }
    },[updateNicknameDone]);

    const onChangeNickname = useCallback((e)=>{
        e.preventDefault();
        dispatch({
            type:UPDATE_NICKNAME_REQUEST,
            data:{id:myInfo.id, nickname:nickname},
        })
    },[nickname]);


    return(
        <Container>
            <Form>
                <InputContainer>
                    <Label>닉네임</Label>
                    <Nickname
                    value={nickname}
                    onChange={setNickname}
                    />
                    {nicknameError && <ErrorMessage>닉네임은 2글자 이상 6글자 이하여야 합니다.</ErrorMessage> }
                </InputContainer>
                <ButtonContainer>
                    <Button
                    title={"수정"}
                    onClick={onChangeNickname}
                    disabled={nicknameError || nickname===myInfo.nickname}
                    />
                </ButtonContainer>
            </Form>
            {showAlert && <Alert text={"닉네임 변경이 완료되었습니다."}/>}
        </Container>
    );
}

const Container = styled.div`
    width:80%;
    margin:auto;
    padding-top:150px;
`;

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
`;

const ErrorMessage = styled.div`
    width:80%;
    color:#ff3333;
    position:absolute;
    bottom:-40px;
`;

const ButtonContainer = styled.div`
    flex-basis:30%;
`;
export default Info;