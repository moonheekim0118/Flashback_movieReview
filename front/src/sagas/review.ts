import { 
    all, 
    fork,
    takeLatest,
    put,
    call 
} from 'redux-saga/effects';
import * as type from '../actions/review';
import axios from 'axios';

function loadMyReivewsAPI(){
    return axios.get('/');
}

function loadSingleReviewAPI(id){
    return axios.get('/');
}

function addMyReivewAPI(data){
    return axios.post('/');
}

function removeMyReviewAPI(id){
    return axios.delete('/');
}

function updateMyReviewAPI(data){
    return axios.put('/');
}

function* loadMyReivews(action){
    try{
        // const result = yield call(loadMovieListsAPI,action.data);
        yield put({
            type:type.LOAD_MY_REVIEWS_SUCCESS,
            data:''
        })        
    }catch(err){
        console.log(err);
        yield put({
            type:type.LOAD_MY_REVIEWS_FAIL,
            error:err
        });
    }
}


function* loadSingleReivew(action){
    try{
        // const result = yield call(loadMovieListsAPI,action.data);
        yield put({
            type:type.LOAD_SINGLE_REVIEW_SUCCESS,
            data:'',
        })        
    }catch(err){
        console.log(err);
        yield put({
            type:type.LOAD_SINGLE_REVIEW_FAIL,
            error:err
        });
    }
}

function* addMyReivew(action){
    try{
        // const result = yield call(loadRelatedSearchAPI,action.data);
        yield put({
            type:type.ADD_MY_REVIEW_SUCCESS,
            data:action.data,
        })        
    }catch(err){
        yield put({
            type:type.ADD_MY_REVIEW_FAIL,
            error:err
        });
    } 
}


function* removeMyReview(action){
    try{
        // const result = yield call(loadRelatedSearchAPI,action.data);
        yield put({
            type:type.REMOVE_MY_REVIEW_SUCCESS,
            data:''
        })        
    }catch(err){
        yield put({
            type:type.REMOVE_MY_REVIEW_FAIL,
            error:err
        });
    } 
}

function* updateMyReivew(action){
    try{
        // const result = yield call(loadRelatedSearchAPI,action.data);
        yield put({
            type:type.UPDATE_MY_REVIEW_SUCCESS,
            data:''
        })        
    }catch(err){
        yield put({
            type:type.UPDATE_MY_REVIEW_FAIL,
            error:err
        });
    } 
}


function* watchLoadMyReview(){
    yield takeLatest(type.LOAD_MY_REVIEWS_REQUEST, loadMyReivews);
}

function* watchLoadSingleReview(){
    yield takeLatest(type.LOAD_SINGLE_REVIEW_REQUEST, loadSingleReivew);
}

function* watchAddMyReview(){
    yield takeLatest(type.ADD_MY_REVIEW_REQUEST,addMyReivew);
}

function* watchRemoveMyReview(){
    yield takeLatest(type.REMOVE_MY_REVIEW_REQUEST,removeMyReview);
}

function* watchUpdateMyReview(){
    yield takeLatest(type.UPDATE_MY_REVIEW_REQUEST,updateMyReivew);
}

export default function* movieSaga(){
    yield all([
        fork(watchLoadMyReview),
        fork(watchLoadSingleReview),
        fork(watchAddMyReview),
        fork(watchRemoveMyReview),
        fork(watchUpdateMyReview),
    ]);
}