import { configureStore, combineReducers, Action } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import charactersReducer, { charactersReducerName } from './characters';
import favouritesReducer, { favouritesReducerName } from './favourites';
import appLoadingReducer, { appLoadingReducerName } from './appLoading';


const rootReducer = combineReducers({
  [charactersReducerName]: charactersReducer,
  [favouritesReducerName]: favouritesReducer,
  [appLoadingReducerName]: appLoadingReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [favouritesReducerName],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

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
