import {
  applyMiddleware, compose, createStore, StoreEnhancer, combineReducers, Action,
} from 'redux';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import charactersReducer from './characters';


// const rootReducer = combineReducers({ characters: charactersReducer });
const rootReducer = combineReducers({ characters: charactersReducer });
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];
const enhancers: StoreEnhancer[] = [];

const enhancer: StoreEnhancer = composeEnhancers(...[
  applyMiddleware(...middleware),
  ...enhancers,
]);


const store = createStore(persistedReducer, {}, enhancer);
export default store;

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
