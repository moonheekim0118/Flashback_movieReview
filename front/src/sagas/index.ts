import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import user from './user';
import movie from './movie';

// axios.defaults.withCredentials=true;
// 나중에 movie 빼고는 witCredentials 다시 설정해주기

export default function* rootSaga(){
    yield all([
        fork(user),
        fork(movie),
    ]);
};