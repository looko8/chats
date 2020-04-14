import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga'
import {persistStore} from "redux-persist";
import { composeWithDevTools } from 'redux-devtools-extension';

import rootSaga from './rootSaga';
import rootReducer from './rootReducer';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export default {store, persistor};
