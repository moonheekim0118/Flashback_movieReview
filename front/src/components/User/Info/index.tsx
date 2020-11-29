import React , { useRef, useCallback  } from 'react';
import { useDispatch } from 'react-redux';
import { MyInfo } from '../../../model/MyInfo';
import { OPEN_ALERT } from '../../../actions/alert';
import { UPDATE_NICKNAME_REQUEST , UPDATE_PROFILE_PIC_REQUEST } from '../../../actions/user';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import useValidation from '../../../hooks/useValidation';
import Button from '../../../atoms/Buttons';
import Icon from '../../../atoms/Icons';
import Logout from '../Logout';
import Avatar from '../../Avatar';
import Slot from '../../Slot';
import styled from 'styled-components';

interface Props {
    myInfo?:MyInfo
}

// 닉네임 수정 
const Info=({myInfo} : Props)=>{
    const dispatch = useDispatch();
    const imageInput = useRef(null);

    const [ nickname,  // 닉네임 
            setNickname, 
            nicknameError
        ] = useValidation(myInfo.nickname,2,6);

    // 이미지 업로드 버튼 클릭시 
    const onUploadImage = useCallback(()=>{ 
        imageInput.current.click();
    },[imageInput.current]);

    // 이미지 업로드시
    const onChangeImage = useCallback((e)=>{
        const imageFormData = new FormData();
        imageFormData.append('image',e.target.files[0]);
        dispatch({type:UPDATE_PROFILE_PIC_REQUEST, data:imageFormData}); // 아바타 변경 
    },[]);

    // 닉네임 변경 
    const onChangeNickname = useCallback((e)=>{ 
        e.preventDefault();
        dispatch({
            type:UPDATE_NICKNAME_REQUEST,
            data:{nickname:nickname},
        })
        dispatch({type:OPEN_ALERT, data:"닉네임이 변경되었습니다."}); // 확인 alert 
    },[nickname]);

    return(
        <Container>
            <AvatarContainer>
                <input type="file" multiple name="image" hidden ref={imageInput} onChange={onChangeImage}/>
                <Overlay/>
                <EditIcon onClick={onUploadImage}>
                    <Icon icon={faPlus} color={"white"} />
                 </EditIcon>
                <Avatar size={100}/>
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
            <ReviewCountContainer>
                <Title>{myInfo.Reviews} 개의 리뷰를 쓰신 당신은!</Title>
                 <Slot reviewsCount={myInfo.Reviews}/>
            </ReviewCountContainer>
            <ReviewCountContainer>
                <Title>{myInfo.nickname}님의 인생영화</Title>
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

    background-color:inherit;
    color:inherit;
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
    width:100px;
    height:100px;
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

const Title = styled.div`
    font-size:1.3rem;
    font-weight:bold;
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