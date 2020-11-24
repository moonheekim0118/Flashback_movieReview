import * as type from '../actions/user';
import { produce } from 'immer';

export const initialState={
    loginDone:false, // 로그인 
    loginLoading:false, 
    loginError:null,

    logoutDone:false, // 로그아웃
    logoutLoading:false,
    logoutError:null,

    signUpDone:false, // 회원가입
    signUpLoading:false, 
    signUpError:null,

    loadMyInfoDone:false, // 내 정보 불러오기
    loadMyInfoLoading:false,
    loadMyInfoError:null,

    updateNicknameDone:false, // 닉네임 수정
    updateNicknameLoading:false,
    updateNicknameError:null,

    updateProfilePicDone:false, // 프로필 사진 (아바타) 수정
    updateProfilePicLoading:false,
    updateProfilePicError:null,

    myInfo:null, // 현재 로그인된 사용자 정보 
    myReviews:[], // 현재 로그인된 사용자의 리뷰리스트 
};

const reducer =  (state=initialState, action)=>{
    return produce(state,draft=>{
        switch(action.type){
            // 로그인 
            case type.LOGIN_REQUEST:
                draft.loginDone=false;
                draft.loginLoading=true;
                draft.loginError=null;
                break;
            
            case type.LOGIN_SUCCESS:
                draft.myInfo=action.data; 
                draft.loginDone=true;
                draft.loginLoading=false;
                break;

            case type.LOGIN_FAIL:
                draft.loginLoading=false;
                draft.loginError=action.error;
                break;
            
            // 로그아웃
            case type.LOGOUT_REQUEST:
                draft.logoutDone=false;
                draft.logoutLoading=true;
                draft.logoutError=null;
                break;
            
            case type.LOGOUT_SUCCESS:
                draft.logoutDone=true;
                draft.logoutLoading=false;
                draft.loginDone=false;
                draft.myInfo=null;
                break;

            case type.LOGOUT_FAIL:
                draft.logoutLoading=false;
                draft.logoutError=action.error;
            
            // 회원가입
            case type.SIGNUP_REQUEST:
                draft.signUpDone=false;
                draft.signUpLoading=true;
                draft.signUpError=null;
                break;

            case type.SIGNUP_SUCCESS:
                draft.signUpDone=true;
                draft.signUpLoading=false;
                break;

            case type.SIGNUP_FAIL:
                draft.signUpLoading=false;
                draft.signUpError=action.error;
                break;
            
            // 내정보 불러오기
            case type.LOAD_MY_INFO_REQUEST:
                draft.loadMyInfoDone=false;
                draft.loadMyInfoLoading=true;
                draft.loadMyInfoError=null;
                break;

            case type.LOAD_MY_INFO_SUCCESS:
                draft.loadMyInfoDone=true;
                draft.loadMyInfoLoading=false;
                draft.myInfo=action.data;
                break;
            
            case type.LOAD_MY_INFO_FAIL:
                draft.loadMyInfoLoading=false;
                draft.loadMyInfoError=action.error;
                break;
            
            // 닉네임 수정 
            case type.UPDATE_NICKNAME_REQUEST:
                draft.updateNicknameDone=false;
                draft.updateNicknameLoading=true;
                draft.updateNicknameError=null;
                break;
            
            case type.UPDATE_NICKNAME_SUCCESS:
                draft.updateNicknameDone=true;
                draft.updateNicknameLoading=false;
                draft.myInfo.nickname=action.data.nickname;
                break;

            case type.UPDATE_NICKNAME_FAIL:
                draft.updateNicknameLoading=false;
                draft.updateNicknameError=action.error;
                break;
            
            // 프로필 사진 수정
            case type.UPDATE_PROFILE_PIC_REQUEST:
                draft.updateProfilePicDone=false;
                draft.updateProfilePicLoading=true;
                draft.updateProfilePicError=null;
                break;
            
            case type.UPDATE_PROFILE_PIC_SUCCESS:
                draft.updateProfilePicDone=true;
                draft.updateProfilePicLoading=false;
                draft.myInfo.profilePic=action.data; // 프로필 사진 변경 
                break;
            
            case type.UPDATE_PROFILE_PIC_FAIL:
                draft.updateProfilePicLoading=false;
                draft.updateProfilePicError=action.error;
                break;
        }
    });
};

export default reducer;