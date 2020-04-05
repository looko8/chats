import { all, fork } from 'redux-saga/effects';
import {root as chatSaga} from './chats';
import {root as authSaga} from './auth';

export default function* root() {
    yield all([
        fork(authSaga),
        fork(chatSaga)
    ]);
}
