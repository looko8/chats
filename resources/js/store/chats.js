import {call, put, takeLatest} from 'redux-saga/effects';
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import {fetchChatList as apiFetchChatList, subscribe as apiSubscribeToChat, sendMessage as apiSendMessage, fetchMessageList as apiFetchMessageList} from "../requests/chats";

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

const FETCH_MESSAGE_LIST_REQUEST = 'my-app/chats/FETCH_MESSAGE_LIST_REQUEST';
const FETCH_MESSAGE_LIST_SUCCESS = 'my-app/chats/FETCH_MESSAGE_LIST_SUCCESS';
const FETCH_MESSAGE_LIST_FAILED = 'my-app/chats/FETCH_MESSAGE_LIST_FAILED';

const initialState = {
    list: {},
    messages: {
        current_page: null,
        data: [],
        last_page: null
    },
    loading: false,
    errors: false
};

export default persistReducer(
    {key: 'chats', storage, blacklist: ['loading', 'errors', 'messages']},
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
            return Object.assign({}, state, {
                messages: {
                    ...state.messages,
                    data: [
                        ...state.messages.data,
                        action.data
                    ],
                }
            }, {loading: false, errors: false});
        case SEND_MESSAGE_FAILED:
            return {
                ...state,
                loading: false,
                errors: action.errors
            };
        case SAVE_MESSAGE_FROM_EVENT:
            return Object.assign({}, state, {
                messages: {
                    ...state.messages,
                    data: [
                        ...state.messages.data,
                        action.data
                    ],
                }
            });
        case FETCH_MESSAGE_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                errors: false,
            };
        case FETCH_MESSAGE_LIST_SUCCESS:
            const prevList = state.messages.data;
            const nextList = action.data.data;
            const reverse = nextList.reverse();
            const newList = reverse.concat(prevList);
            return Object.assign({}, state, {
                messages: {
                    ...state.messages,
                    current_page: action.data.current_page,
                    data: newList,
                    last_page: action.data.last_page
                }
            }, {loading: false, errors: false});
        case FETCH_MESSAGE_LIST_FAILED:
            return {
                ...state,
                loading: false,
                errors: action.errors,
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

export const fetchMessageListRequest = (chat_id, page = 1) => ({
    type: FETCH_MESSAGE_LIST_REQUEST,
    chat_id,
    page
});

const fetchMessageListSuccess = (data) => ({
    type: FETCH_MESSAGE_LIST_SUCCESS,
    data
});

const fetchMessageListFailed = (errors) => ({
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

function* subscribeToChat(action) {
    try {
        const {data: {data}} = yield call(apiSubscribeToChat, action.data);
        yield put(subscribeToChatSuccess(data));
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

function* fetchMessageList(action) {
    try {
        const {data: {data}} = yield call(apiFetchMessageList, action.chat_id, action.page);
        yield put(fetchMessageListSuccess(data))
    } catch ({response}) {
        yield put(fetchMessageListFailed(response.data))
    }
}

export function* root() {
    yield takeLatest(FETCH_CHAT_LIST_REQUEST, fetchChatList);
    yield takeLatest(SUBSCRIBE_TO_CHAT_REQUEST, subscribeToChat);
    yield takeLatest(SEND_MESSAGE_REQUEST, sendMessage);
    yield takeLatest(FETCH_MESSAGE_LIST_REQUEST, fetchMessageList)
}




