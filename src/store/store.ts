import { composeWithDevTools } from '@redux-devtools/extension';
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, Store } from 'redux';
import rootReducer from './rootReducer';
import apiSaga from './apiSaga';

const sagaMiddleware = createSagaMiddleware();

export const store: Store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )

);

sagaMiddleware.run(apiSaga);

export type RootState = ReturnType<typeof store.getState>;
