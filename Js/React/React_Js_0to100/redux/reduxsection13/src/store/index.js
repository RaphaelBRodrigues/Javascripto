import { createStore, applyMiddleware } from 'redux';
import rootReducer from './modules/rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './modules/rootSaga';


const sagaMiddlewaare = createSagaMiddleware();
const enhancer = applyMiddleware(sagaMiddlewaare);
const store = createStore(rootReducer, enhancer);

sagaMiddlewaare.run(rootSaga);

export default store;