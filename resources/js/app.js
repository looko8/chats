import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import App from "./router/App";
import {Provider} from 'react-redux';
import store from "./store";

console.log(store.getState());
store.dispatch({type: "FETCH_CHAT_LIST_REQUEST"});
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
