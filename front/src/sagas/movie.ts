import { all, fork, takeLatest, put, call } from 'redux-saga/effects';
import * as type from '../actions/movie';
import axios from 'axios';

function loadMovieListsAPI(data) {
  return axios.get(
    `/movie/${encodeURIComponent(data.title)}/movieList?start=${data.start}`
  );
}

function loadRelatedSearchAPI(keyword) {
  return axios.get(`/movie/${keyword}/relatedSearch`);
}

function* loadMovieLists(action) {
  try {
    const result = yield call(loadMovieListsAPI, action.data);
    console.log(result);
    yield put({
      type: type.LOAD_MOVIES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: type.LOAD_MOVIES_FAIL,
      error: err || '다시 시도해주세요.',
    });
  }
}

function* loadRelatedSearch(action) {
  try {
    const result = yield call(loadRelatedSearchAPI, action.data);
    yield put({
      type: type.LOAD_RELATED_SEARCH_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: type.LOAD_RELATED_SEARCH_FAIL,
      error: err.response.data || '다시 시도해주세요.',
    });
  }
}

function* watchLoadMovieList() {
  yield takeLatest(type.LOAD_MOVIES_REQUEST, loadMovieLists);
}

function* watchLoadRelatedSearch() {
  yield takeLatest(type.LOAD_RELATED_SEARCH_REQUEST, loadRelatedSearch);
}

export default function* movieSaga() {
  yield all([fork(watchLoadMovieList), fork(watchLoadRelatedSearch)]);
}
