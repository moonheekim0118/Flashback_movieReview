import { 
    all, 
    fork,
    takeLatest,
    put,
    call 
} from 'redux-saga/effects';
import * as type from '../actions/movie';
import axios from 'axios';
import { API_KEY } from '../Config/config';
const API_URI=" http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=";

function loadMovieListsAPI(){
    //return axios.get('/');
}

function loadSingleMovieAPI(){
    //return axios.get('/');
}

function loadRelatedSearchAPI(keyword){
    return axios.get(`${API_URI}${API_KEY}&movieNm=${keyword}&itemPerPage=${5}`);
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


function* loadRelatedSearch(action){
    try{
        const result = yield call(loadRelatedSearchAPI,action.data);
        yield put({
            type:type.LOAD_RELATED_SEARCH_SUCCESS,
            data:result.data.movieListResult.movieList
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