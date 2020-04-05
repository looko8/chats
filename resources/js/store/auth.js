import {call, put, takeLatest} from 'redux-saga/effects';
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import {sanctum, login as apiLoginRequest, register as apiRegisterRequest, logout as apiLogoutRequest} from "../requests/auth";

const LOGIN_REQUEST = "my-app/auth/LOGIN_REQUEST";
const LOGIN_SUCCESS = "my-app/auth/LOGIN_SUCCESS";
const LOGIN_FAILED = "my-app/auth/LOGIN_FAILED";

const REGISTER_REQUEST = "my-app/auth/REGISTER_REQUEST";
const REGISTER_SUCCESS  = "my-app/auth/REGISTER_SUCCESS";
const REGISTER_FAILED = "my-app/auth/REGISTER_FAILED";

const LOGOUT_REQUEST = "my-app/auth/LOGOUT_REQUEST";
const LOGOUT_SUCCESS = "my-app/auth/LOGOUT_SUCCESS";
const LOGOUT_FAILED = "my-app/auth/LOGOUT_FAILED";

const initialState = {
    user: {},
    isLoggedIn: false,
    loading: false,
    registered: false,
    errors: {
        message: false,
        name: false,
        email: false,
        password: false
    }
};

export default persistReducer(
    {key: 'auth', storage, blacklist: ['loading', 'errors', 'registered']},
    function(state = initialState, action) {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
                errors: initialState.errors
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                registered: true,
                errors: initialState.errors
            };
        case REGISTER_FAILED:
            return {
                ...state,
                loading: false,
                errors: {
                    ...state.errors,
                    message: action.errors.message,
                    name: action.errors.errors.name,
                    email: action.errors.errors.email,
                    password: action.errors.errors.password
                }
            };
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                errors: initialState.errors
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isLoggedIn: true,
                errors: initialState.errors,
                user: action.user
            };
        case LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                errors: {
                    ...state.errors,
                    message: action.errors.message
                }
            };
        case LOGOUT_REQUEST:
            return {
                ...state,
                loading: true,
                errors: initialState.errors
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                isLoggedIn: false,
                errors: initialState.errors
            };
        case LOGOUT_FAILED:
            return {
                ...state,
                loading: false,
                errors: {
                    ...state.errors,
                    message: action.errors.message
                }
            };
        default:
            return state;
    }
});


export const loginRequest = (user) => ({
    type: LOGIN_REQUEST,
    user
});

const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    user
});

const loginFailed = (errors) => ({
    type: LOGIN_FAILED,
    errors
});

export const registerRequest = (user) => ({
    type: REGISTER_REQUEST,
    user
});

const registerSuccess = () => ({
    type: REGISTER_SUCCESS
});

const registerFailed = (errors) => ({
    type: REGISTER_FAILED,
    errors
});

export const logoutRequest = () => ({
    type: LOGOUT_REQUEST
});

const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS
});

const logoutFailed = (errors) => ({
    type: LOGOUT_FAILED,
    errors
});

function* login(action) {
    try {
        yield call(sanctum);
        const {data: {data}} = yield call(apiLoginRequest, action.user);
        yield put(loginSuccess(data));
    } catch ({response}) {
        yield put(loginFailed(response.data))
    }
}

function* register(action) {
    try {
        const {data: {data}} = yield call(apiRegisterRequest, action.user);
        yield put(registerSuccess(data));
    } catch ({response}) {
        yield put(registerFailed(response.data));
    }
}

function* logout() {
    try {
        yield call(apiLogoutRequest);
        yield put(logoutSuccess())
    } catch ({response}) {
        yield put(logoutFailed(response.data))
    }
}

export function* root() {
    yield takeLatest(LOGIN_REQUEST, login);
    yield takeLatest(REGISTER_REQUEST, register);
    yield takeLatest(LOGOUT_REQUEST, logout);
}
