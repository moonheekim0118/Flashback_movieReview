import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import user from './user';
import movie from './movie';

axios.defaults.withCredentials=true;
export default function* rootSaga(){
    yield all([
        fork(user),
        fork(movie),
    ]);
};