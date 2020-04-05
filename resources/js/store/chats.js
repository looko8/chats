import {call, put, takeLatest} from 'redux-saga/effects';
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import {fetchChatList as apiFetchChatList} from "../requests/chats";

const FETCH_CHAT_LIST_REQUEST = 'FETCH_CHAT_LIST_REQUEST';
const FETCH_CHAT_LIST_SUCCESS = 'FETCH_CHAT_LIST_SUCCESS';
const FETCH_CHAT_LIST_FAILED = 'FETCH_CHAT_LIST_FAILED';

const initialState = {
    list: [],
    loading: false,
    error: false
};

export default persistReducer(
    {key: 'chats', storage, blacklist: ['loading', 'errors']},
    function(state = initialState, action) {
    switch (action.type) {
        case FETCH_CHAT_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            };
        case FETCH_CHAT_LIST_SUCCESS:
            return {
                ...state,
                list: action.chats,
                loading: false,
                error: false
            };
        case FETCH_CHAT_LIST_FAILED:
            return {
                ...state,
                loading: false,
                error: action.errors
            };
        default:
            return state;
    }
});

export const fetchChatListRequest = () => ({
    type: FETCH_CHAT_LIST_REQUEST
});

const fetchChatListSuccess = (chats) => ({
    type: FETCH_CHAT_LIST_SUCCESS,
    chats
});

const fetchChatListFailed = (errors) => ({
    type: FETCH_CHAT_LIST_FAILED,
    errors
});


function* fetchChatList() {
    try {
        const {data: {data}} = yield call(apiFetchChatList);
        yield put(fetchChatListSuccess(data));
    } catch ({response}) {
        yield put(fetchChatListFailed(response.data));
    }
}

export function* root() {
    yield takeLatest(FETCH_CHAT_LIST_REQUEST, fetchChatList)
}




