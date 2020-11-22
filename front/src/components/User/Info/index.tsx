import React , { useRef, useCallback , useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { MyInfo } from '../../../model/MyInfo';
import { UPDATE_NICKNAME_REQUEST , UPDATE_PROFILE_PIC_REQUEST } from '../../../actions/user';
import useValidation from '../../../hooks/useValidation';
import useAlert from '../../../hooks/useAlert';
import Button from '../../../atoms/Buttons';
import Icon from '../../../atoms/Icons';
import Alert from '../../Alert';
import Logout from '../Logout';
import Avatar from '../../Avatar';
import Slot from '../../Slot';
import styled from 'styled-components';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface Props {
    myInfo?:MyInfo
}

// 닉네임 수정 
const Info=({myInfo} : Props)=>{
    const dispatch = useDispatch();
    const updateNicknameDone= useSelector((state)=>state.user.updateNicknameDone);
    const imageInput = useRef(null);
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

    const onUploadImage = useCallback(()=>{
        imageInput.current.click();
    },[imageInput.current]);

    const onChangeImage = useCallback((e)=>{
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f)=>{
            imageFormData.append('image',f);
        });
    },[]);

    const onChangeNickname = useCallback((e)=>{
        e.preventDefault();
        dispatch({
            type:UPDATE_NICKNAME_REQUEST,
            data:{id:myInfo.id, nickname:nickname},
        })
    },[nickname]);


    return(
        <Container>
            <AvatarContainer>
                <input type="file" multiple name="image" hidden ref={imageInput} onChange={onChangeImage}/>
                <Overlay/>
                <EditIcon onClick={onUploadImage}>
                    <Icon icon={faPlus} color={"white"} />
                 </EditIcon>
                <Avatar nickname={myInfo.nickname} size={70}/>
            </AvatarContainer>
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
            <ReviewCountContainer>
                <Title>{myInfo.reviewsCount}개의 리뷰를 쓰신 당신은!</Title>
                 <Slot reviewsCount={myInfo.reviewsCount}/>
            </ReviewCountContainer>
            <LogoutContainer>
                로그아웃 <Logout/>
            </LogoutContainer>
        </Container>
    );
}

const Container = styled.div`
    width:80%;
    margin:auto;
    padding-top:50px;
    position:relative;

    display:flex;
    flex-direction:column;
`;

const AvatarContainer = styled.div`
    margin:20px auto;
    z-index:500;
    position:relative;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width:70px;
    height:70px;
    border-radius:50%;
    background-color: rgba(0,0,0,0.3);
    z-index: 1000;
    cursor:pointer;
`;

const EditIcon = styled.div`
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    padding:10px 15px;font-size:24px;

    border-radius:50%;
    transition: 0.2s background-color ease-in-out;
    z-index:1100;

    &:hover{
        background-color:rgba(255,255,255,0.3);
    }
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
    flex-basis:40%;
`;

const Title = styled.div`
    font-size:1rem;
    color:#cc00cc;
    margin-bottom:20px;
`;

const ReviewCountContainer = styled.div`
    margin-top:100px;
`;

const LogoutContainer = styled.div`
    font-size:1rem;
    color:#cc00cc;
    position:absolute;
    top:15px;
    right:0;
`;


export default Info;