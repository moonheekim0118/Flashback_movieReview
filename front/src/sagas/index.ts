import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import user from './user';
import movie from './movie';
import review from './review';
import { backUrl } from '../Config/config';
axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(user), fork(movie), fork(review)]);
}
