import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Character } from '../types';
import { fetchCharacters } from '../API';
import type { AppDispatch, AppThunk, RootState } from './store';
import { appLoadingEnd, selectAppLoading } from './appLoading';


export type Page = number;

export enum RequestStatus {
  Idle = 'idle',
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected',
}

interface CharactersState {
  requestStatus: RequestStatus,
  page: Page,
  items: Character[],
}

const initialState: CharactersState = {
  requestStatus: RequestStatus.Idle,
  page: 0,
  items: [],
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  /* eslint-disable no-param-reassign */
  reducers: {
    addCharacters(state, action: PayloadAction<Character[]>) {
      state.items.push(...action.payload);
    },
    setPage(state, action: PayloadAction<Page>) {
      state.page = action.payload;
    },
    requestPending(state) {
      state.requestStatus = RequestStatus.Pending;
    },
    requestFulfilled(state) {
      state.requestStatus = RequestStatus.Fulfilled;
    },
    requestRejected(state) {
      state.requestStatus = RequestStatus.Rejected;
    },
  },
  /* eslint-enable no-param-reassign */
});

export const {
  addCharacters, setPage, requestPending, requestFulfilled, requestRejected,
} = charactersSlice.actions;

export const charactersReducerName = charactersSlice.name;
export default charactersSlice.reducer;


export const requestFetchCharacters = (): AppThunk => (
  (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const { page, requestStatus } = state.characters;
    const isAppLoading = selectAppLoading(state);
    if (requestStatus === RequestStatus.Pending) return;

    const newPage = page + 1;

    dispatch(requestPending());
    fetchCharacters(newPage)
      .then((characters) => {
        dispatch(requestFulfilled());
        dispatch(addCharacters(characters));
        dispatch(setPage(newPage));
      })
      .catch((error) => {
        console.error(error);
        dispatch(requestRejected());
      })
      .finally(() => {
        if (isAppLoading) dispatch(appLoadingEnd());
      });
  }
);


export const selectCharacters = (state: RootState) => state.characters.items;

export const selectorIsCharactersFetching = (state: RootState) => (
  (state.characters.requestStatus) === RequestStatus.Pending
);
