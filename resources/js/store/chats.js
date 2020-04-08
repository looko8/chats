import {call, put, takeLatest} from 'redux-saga/effects';
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import {fetchChatList as apiFetchChatList, subscribe as apiSubscribeToChat, sendMessage as apiSendMessage} from "../requests/chats";

const FETCH_CHAT_LIST_REQUEST = 'my-app/chats/FETCH_CHAT_LIST_REQUEST';
const FETCH_CHAT_LIST_SUCCESS = 'my-app/chats/FETCH_CHAT_LIST_SUCCESS';
const FETCH_CHAT_LIST_FAILED = 'my-app/chats/FETCH_CHAT_LIST_FAILED';

const SUBSCRIBE_TO_CHAT_REQUEST = 'my-app/chats/SUBSCRIBE_TO_CHAT_REQUEST';
const SUBSCRIBE_TO_CHAT_SUCCESS = 'my-app/chats/SUBSCRIBE_TO_CHAT_SUCCESS';
const SUBSCRIBE_TO_CHAT_FAILED = 'my-app/chats/SUBSCRIBE_TO_CHAT_FAILED';

const SEND_MESSAGE_REQUEST = 'my-app/chats/SEND_MESSAGE_REQUEST';
const SEND_MESSAGE_SUCCESS = 'my-app/chats/SEND_MESSAGE_SUCCESS';
const SEND_MESSAGE_FAILED = 'my-app/chats/SEND_MESSAGE_FAILED';

const SAVE_MESSAGE_FROM_EVENT = 'my-app/chats/SAVE_MESSAGE_FROM_EVENT';

const initialState = {
    list: {},
    messages: [],
    loading: false,
    errors: false
};

export default persistReducer(
    {key: 'chats', storage, blacklist: ['loading', 'errors']},
    function(state = initialState, action) {
    switch (action.type) {
        case FETCH_CHAT_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                errors: false
            };
        case FETCH_CHAT_LIST_SUCCESS:
            return {
                ...state,
                list: action.chats,
                loading: false,
                errors: false
            };
        case FETCH_CHAT_LIST_FAILED:
            return {
                ...state,
                loading: false,
                errors: action.errors
            };
        case SUBSCRIBE_TO_CHAT_REQUEST:
            return {
                ...state,
                loading: true,
                errors: false
            };
        case SUBSCRIBE_TO_CHAT_SUCCESS:
            const unsubscribedChat = state.list.unsubscribed.filter(chat => Number(chat.id) === Number(action.data.chat_id))[0];
            const newUnsubscribedChats = state.list.unsubscribed.filter(chat => Number(chat.id) !== Number(action.data.chat_id));
            return Object.assign({}, state, {
                list: {
                    ...state.list,
                    subscribed: [
                        ...state.list.subscribed,
                        unsubscribedChat
                    ],
                    unsubscribed: newUnsubscribedChats
                }
            }, {loading: false, errors: false});
        case SUBSCRIBE_TO_CHAT_FAILED:
            return {
                ...state,
                loading: false,
                errors: action.errors
            };
        case SEND_MESSAGE_REQUEST:
            return {
                ...state,
                loading: true,
                errors: false
            };
        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                errors: false,
                messages: [
                    ...state.messages,
                    action.data
                ]
            };
        case SEND_MESSAGE_FAILED:
            return {
                ...state,
                loading: false,
                errors: action.errors
            };
        case SAVE_MESSAGE_FROM_EVENT:
            return {
                ...state,
                messages: [
                    ...state.messages,
                    action.data
                ]
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

export const sendMessageRequest = (data) => ({
    type: SEND_MESSAGE_REQUEST,
    data
});

const sendMessageSuccess = (data) => ({
    type: SEND_MESSAGE_SUCCESS,
    data
});

const sendMessageFailed = (errors) => ({
    type: SEND_MESSAGE_FAILED,
    errors
});

export const saveMessage = (data) => ({
    type: SAVE_MESSAGE_FROM_EVENT,
    data
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
        const {data: {data}} = yield call(apiSubscribeToChat, action.data);
        yield put(subscribeToChatSuccess(action.data));
    } catch ({response}) {
        yield put(subscribeToChatFailed(response.data));
    }
}

function* sendMessage(action) {
    try {
        const {data: {data}} = yield call(apiSendMessage, action.data);
        yield put(sendMessageSuccess(data))
    } catch ({response}) {
        yield put(sendMessageFailed(response.data));
    }
}

export function* root() {
    yield takeLatest(FETCH_CHAT_LIST_REQUEST, fetchChatList);
    yield takeLatest(SUBSCRIBE_TO_CHAT_REQUEST, subscribeToChat);
    yield takeLatest(SEND_MESSAGE_REQUEST, sendMessage);
}




