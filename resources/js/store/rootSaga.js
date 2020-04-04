import { all, fork } from 'redux-saga/effects';
import {root as chatSaga} from './chats';

export default function* root() {
    yield all([
        chatSaga
    ]);
}
