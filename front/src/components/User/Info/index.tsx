import React , { useRef, useCallback  } from 'react';
import { useDispatch } from 'react-redux';
import { MyInfo } from '../../../model/MyInfo';
import { UPDATE_PROFILE_PIC_REQUEST } from '../../../actions/user';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Icon from '../../../atoms/Icons';
import NicknameChange from '../NicknameChange';
import Logout from '../Logout';
import Avatar from '../../Avatar';
import Slot from '../../Slot';
import styled from 'styled-components';

interface Props {
    myInfo:MyInfo
}

// 닉네임 수정 
const Info=({myInfo} : Props)=>{
    const dispatch = useDispatch();
    const imageInput = useRef<any>(null);

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

    return(
        <Container>
            <AvatarContainer>
                <input type="file" multiple name="image" hidden ref={imageInput} onChange={onChangeImage}/>
                <Overlay/>
                <EditIcon onClick={onUploadImage}>
                    <Icon icon={faPlus} className="faPlus" color="white" />
                 </EditIcon>
                <Avatar size={100}/>
            </AvatarContainer>
            <NicknameChange exNickname={myInfo.nickname}/>
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