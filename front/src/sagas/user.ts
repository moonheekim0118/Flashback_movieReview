import { 
    all, 
    fork,
    takeLatest,
    put,
    call,
} from 'redux-saga/effects';
import * as type from '../actions/user';
import axios from 'axios';

function loadMyInfoAPI(){
    return axios.get('/user');
}

function loginAPI(data){
    return axios.post('/user/login',data);
}

function logoutAPI(){
    return axios.post('/user/logout');
}

function signUpAPI(data){
    return axios.post('/user/signUp',data);
}

function updateNicknameAPI(data){
    return axios.put('/user/updateNickname',data); // id와 닉네임 가져오기
}

function updateProfilePicAPI(data){
    return axios.post('/user/updateProfilePic',data); // id와 닉네임 가져오기
}

function addFavoriteMovieAPI(data){
    return axios.post('/user/addFavoriteMovie',data); // id와 닉네임 가져오기
}

function* loadMyInfo(){
    try{
        const result = yield call(loadMyInfoAPI);
        yield put({
            type:type.LOAD_MY_INFO_SUCCESS,
            data:result.data
        })        
    }catch(err){
        yield put({
            type:type.LOAD_MY_INFO_FAIL,
            error:err || '다시 시도해주세요.'
        });
    }
}

function* login(action){
    try{
        const result = yield call(loginAPI,action.data);
        yield put({
            type:type.LOGIN_SUCCESS,
            data:result.data,
        })        
    }catch(err){
        console.log(err);
        yield put({
            type:type.LOGIN_FAIL,
            error:err.response.data || '다시 시도해주세요.'
        });
    }
}

function* logout(){
    try{
        yield call(logoutAPI);
        yield put({
            type:type.LOGOUT_SUCCESS,
        })        
    }catch(err){
        yield put({
            type:type.LOGOUT_FAIL,
            error:err.response.data || '다시 시도해주세요.'
        });
    }
}

function* signUp(action){
    try{
        const result = yield call(signUpAPI,action.data);
        yield put({
            type:type.SIGNUP_SUCCESS,
            data:result.data,
        })        
    }catch(err){
        yield put({
            type:type.SIGNUP_FAIL,
            error:err.response.data || '다시 시도해주세요.'
        });
    }
}

function* updateNickname(action){
    try{
        const result = yield call(updateNicknameAPI,action.data);
        yield put({
            type:type.UPDATE_NICKNAME_SUCCESS,
            data:result.data,
        })   

    }catch(err){
        yield put({
            type:type.UPDATE_NICKNAME_FAIL,
            error:err.response.data || '다시 시도해주세요.'
        });
    }
}

function* updateProfilePic(action){
    try{
        const result = yield call(updateProfilePicAPI,action.data);
        yield put({
            type:type.UPDATE_PROFILE_PIC_SUCCESS,
            data:result.data,
        })   

    }catch(err){
        yield put({
            type:type.UPDATE_PROFILE_PIC_FAIL,
            error:err.response.data || '다시 시도해주세요.'
        });
    }
}

function* addFavoriteMovie(action){
    try{
        const result = yield call(addFavoriteMovieAPI,action.data);
        yield put({
            type:type.ADD_FAVORITE_MOVIE_SUCCESS,
            data:result.data,
        })   

    }catch(err){
        yield put({
            type:type.ADD_FAVORITE_MOVIE_FAIL,
            error:err.response.data || '다시 시도해주세요.'
        });
    }
}


function* watchLoadMyInfo(){
    yield takeLatest(type.LOAD_MY_INFO_REQUEST, loadMyInfo);
};

function* watchLogin(){
    yield takeLatest(type.LOGIN_REQUEST, login);
};

function* watchLogout(){
    yield takeLatest(type.LOGOUT_REQUEST, logout);
};

function* watchSignUp(){
    yield takeLatest(type.SIGNUP_REQUEST, signUp);
};

function* watchUpdateNickname(){
    yield takeLatest(type.UPDATE_NICKNAME_REQUEST, updateNickname);
};

function* watchUpdateProfilePic(){
    yield takeLatest(type.UPDATE_PROFILE_PIC_REQUEST,updateProfilePic);
}

function* watchAddFavoriteMovie(){
    yield takeLatest(type.ADD_FAVORITE_MOVIE_REQUEST,addFavoriteMovie);
}


export default function* userSaga(){
    yield all([
        fork(watchLoadMyInfo),
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignUp),
        fork(watchUpdateNickname),
        fork(watchUpdateProfilePic),
        fork(watchAddFavoriteMovie),
    ]);
}