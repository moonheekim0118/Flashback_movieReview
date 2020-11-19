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
                // 로그인 완료 처리해주기
                draft.loginDone=true;
                draft.myInfo=action.data;
                break;

            case type.SIGNUP_FAIL:
                draft.signUpLoading=false;
                draft.signUpError=action.error;
                break;
            
        }
    });
};

export default reducer;