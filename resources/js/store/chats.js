import {call, put, takeLatest} from 'redux-saga/effects';

const FETCH_CHAT_LIST_REQUEST = 'FETCH_CHAT_LIST_REQUEST';
const FETCH_CHAT_LIST_SUCCESS = 'FETCH_CHAT_LIST_SUCCESS';
const FETCH_CHAT_LIST_FAILED = 'FETCH_CHAT_LIST_FAILED';

const initialState = {
    list: [],
    loading: false,
    error: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CHAT_LIST_REQUEST:
            console.log('request');
            return state;
        case FETCH_CHAT_LIST_SUCCESS:
            console.log('success');
            return state;
        case FETCH_CHAT_LIST_FAILED:
            console.log('failed');
            return state;
        default:
            return state;
    }
}

function* fetchChatList() {
    console.log('opa saga, qqqq');
}

export function* root() {
    yield takeLatest(FETCH_CHAT_LIST_REQUEST, fetchChatList)
}




