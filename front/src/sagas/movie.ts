import { 
    all, 
    fork,
    takeLatest,
    put,
    call 
} from 'redux-saga/effects';
import * as type from '../actions/movie';
import axios from 'axios';

function loadMovieListsAPI(){
    //return axios.get('/');
}

function loadSingleMovieAPI(){
    //return axios.get('/');
}

function* loadMovieLists(){
    try{
        const result = yield call(loadMovieListsAPI);
        yield put({
            type:type.LOAD_MOVIES_SUCCESS
        })        
    }catch(err){
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

function* watchLoadMovieList(){
    yield takeLatest(type.LOAD_MOVIES_REQUEST, loadMovieLists);
}

function* watchLoadSingleMovie(){
    yield takeLatest(type.LOAD_SINGLE_MOVIE_REQUEST, loadSingleMovie);
}


export default function* movieSaga(){
    yield all([
        fork(watchLoadMovieList),
        fork(watchLoadSingleMovie),
    ]);
}