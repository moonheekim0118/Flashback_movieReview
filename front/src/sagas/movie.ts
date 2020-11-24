import { 
    all, 
    fork,
    takeLatest,
    put,
    call 
} from 'redux-saga/effects';
import * as type from '../actions/movie';
import axios from 'axios';

function loadMovieListsAPI(data){
    return axios.get(`/movie/${data.title}/movieList?start=${data.start}`);
}

function loadSingleMovieAPI(id){
    return axios.get('/'); // 나중에 id 추가 
}

function loadRelatedSearchAPI(keyword){
    return axios.get(`/movie/${keyword}/relatedSearch`);
}

function* loadMovieLists(action){
    try{
        const result = yield call(loadMovieListsAPI,action.data);
        yield put({
            type:type.LOAD_MOVIES_SUCCESS,
            data:result.data
        })        
    }catch(err){
        console.log(err);
        yield put({
            type:type.LOAD_MOVIES_FAIL,
            error:err
        });
    }
}

function* loadSingleMovie(action){
    try{
        // const result = yield call(loadMovieListsAPI,action.data);
        yield put({
            type:type.LOAD_SINGLE_MOVIE_SUCCESS,
            data:action.data,
        })        
    }catch(err){
        console.log(err);
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
            data:result.data
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
    yield takeLatest(type.LOAD_SINGLE_MOVIE_REQUEST,loadSingleMovie);
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