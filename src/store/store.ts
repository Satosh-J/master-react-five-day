import { createStore, Store } from 'redux';
import rootReducer from './rootReducer';
import { composeWithDevTools } from '@redux-devtools/extension';

export const store: Store = createStore(
  rootReducer,
  composeWithDevTools()
);

export type RootState = ReturnType<typeof store.getState>;
