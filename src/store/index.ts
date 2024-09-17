// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger'; // Import redux-logger
import rootReducer from './rootReducer';
import { rootSaga } from './RootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware, logger), // Add redux-logger here
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
