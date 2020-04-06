import {call, put, takeLatest} from 'redux-saga/effects';
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import {fetchChatList as apiFetchChatList, subscribe as apiSubscribeToChat} from "../requests/chats";
import {getUnsubscribedChat, getUnsubscribedChats} from "./selectors/chats";

const FETCH_CHAT_LIST_REQUEST = 'my-app/chats/FETCH_CHAT_LIST_REQUEST';
const FETCH_CHAT_LIST_SUCCESS = 'my-app/chats/FETCH_CHAT_LIST_SUCCESS';
const FETCH_CHAT_LIST_FAILED = 'my-app/chats/FETCH_CHAT_LIST_FAILED';

const SUBSCRIBE_TO_CHAT_REQUEST = 'my-app/chats/SUBSCRIBE_TO_CHAT_REQUEST';
const SUBSCRIBE_TO_CHAT_SUCCESS = 'my-app/chats/SUBSCRIBE_TO_CHAT_SUCCESS';
const SUBSCRIBE_TO_CHAT_FAILED = 'my-app/chats/SUBSCRIBE_TO_CHAT_FAILED';

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
        case SUBSCRIBE_TO_CHAT_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            };
        case SUBSCRIBE_TO_CHAT_SUCCESS:
            const unsubscribedChat = getUnsubscribedChat(state, action.data.chat_id);
            //let subscribedChats = Object.assign(state.list.subscribed);
            //subscribedChats.push(unsubscribedChat);
            //console.log(subscribedChats);
            return state;
            /*const unsubscribedChat = getUnsubscribedChat(action.data.chat_id);
            let subscribedChats = Object.assign({}, state);
            subscribedChats.push(unsubscribedChat);
            const unsubscribedChats = getUnsubscribedChats(state).filter(chat => Number(chat.id) !== Number(action.data.chat_id));
            return Object.assign({}, state, {loading: false}, {error: false}, {subscribed: {subscribedChats}}, {unsubscribed: {unsubscribedChats}});*/
        case SUBSCRIBE_TO_CHAT_FAILED:
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

export const subscribeToChatRequest = (data) => ({
    type: SUBSCRIBE_TO_CHAT_REQUEST,
    data
});

const subscribeToChatSuccess = (data) => ({
    type: SUBSCRIBE_TO_CHAT_SUCCESS,
    data
});

const subscribeToChatFailed = (errors) => ({
    type: SUBSCRIBE_TO_CHAT_FAILED,
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

function* subscribeToChat(action) {
    try {
        yield call(apiSubscribeToChat, action.data);
        yield put(subscribeToChatSuccess(action.data));
    } catch ({response}) {
        yield put(subscribeToChatFailed(response.data))
    }
}

export function* root() {
    yield takeLatest(FETCH_CHAT_LIST_REQUEST, fetchChatList);
    yield takeLatest(SUBSCRIBE_TO_CHAT_REQUEST, subscribeToChat);
}




