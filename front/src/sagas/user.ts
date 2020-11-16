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
    //return axios.get('/');
}

function loginAPI(){
    //return axios.get('/');
}

function logoutAPI(){
    //return axios.get('/');
}

function signUpAPI(){
    //return axios.get('/');
}

function* loadMyInfo(){
    try{
        const result = yield call(loadMyInfoAPI);
        yield put({
            type:type.LOAD_MY_INFO_SUCCESS
        })        
    }catch(err){
        yield put({
            type:type.LOAD_MY_INFO_FAIL,
            error:err
        });
    }
}

function* login(action){
    try{
        //const result = yield call(loginAPI);
        yield put({
            type:type.LOGIN_SUCCESS,
            data:action.data,
        })        
    }catch(err){
        yield put({
            type:type.LOGIN_FAIL,
            error:err
        });
    }
}

function* logout(action){
    try{
        //const result = yield call(loginAPI);
        yield put({
            type:type.LOGOUT_SUCCESS,
            data:action.data,
        })        
    }catch(err){
        yield put({
            type:type.LOGOUT_FAIL,
            error:err
        });
    }
}

function* signUp(action){
    try{
        //const result = yield call(loginAPI);
        yield put({
            type:type.SIGNUP_SUCCESS,
            data:action.data,
        })        
    }catch(err){
        yield put({
            type:type.SIGNUP_FAIL,
            error:err
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


export default function* userSaga(){
    yield all([
        fork(watchLoadMyInfo),
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignUp),
    ]);
}