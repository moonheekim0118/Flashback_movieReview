import { 
    all, 
    fork,
    takeLatest,
    put,
    call 
} from 'redux-saga/effects';
import * as type from '../actions/movie';
import axios from 'axios';

function loadMovieListsAPI(keyword){
    return axios.get('/');
}

function loadSingleMovieAPI(){
    return axios.get('/');
}

function loadRelatedSearchAPI(keyword){
    return axios.get('/');
}

function* loadMovieLists(action){
    try{
        // const result = yield call(loadMovieListsAPI,action.data);
        yield put({
            type:type.LOAD_MOVIES_SUCCESS,
            data:''
        })        
    }catch(err){
        console.log(err);
        yield put({
            type:type.LOAD_MOVIES_FAIL,
            error:err
        });
    }
}

function* loadSingleMovie(){
    try{
        const result = yield call(loadSingleMovieAPI);
        yield put({
            type:type.LOAD_SINGLE_MOVIE_SUCCESS
        })        
    }catch(err){
        yield put({
            type:type.LOAD_SINGLE_MOVIE_FAIL,
            error:err
        });
    } 
}


function* loadRelatedSearch(action){
    try{
        // const result = yield call(loadRelatedSearchAPI,action.data);
        yield put({
            type:type.LOAD_RELATED_SEARCH_SUCCESS,
            data:''
        })        
    }catch(err){
        yield put({
            type:type.LOAD_RELATED_SEARCH_FAIL,
            error:err
        });
    } 
}

function* watchLoadMovieList(){
    yield takeLatest(type.LOAD_MOVIES_REQUEST, loadMovieLists);
}

function* watchLoadSingleMovie(){
    yield takeLatest(type.LOAD_SINGLE_MOVIE_REQUEST, loadSingleMovie);
}

function* watchLoadRelatedSearch(){
    yield takeLatest(type.LOAD_RELATED_SEARCH_REQUEST,loadRelatedSearch);
}

export default function* movieSaga(){
    yield all([
        fork(watchLoadMovieList),
        fork(watchLoadSingleMovie),
        fork(watchLoadRelatedSearch),
    ]);
}