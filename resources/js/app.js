import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import App from "./router/App";
import {Provider} from 'react-redux';
import config from "./store";
import { PersistGate } from 'redux-persist/es/integration/react'

ReactDOM.render(
    <Provider store={config.store}>
        <PersistGate loading={null} persistor={config.persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('app')
);
