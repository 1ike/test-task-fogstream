import { AnyAction } from 'redux';

import { Reducer } from 'react';
import { Character } from '../types';
import { fetchCharacters } from '../API';
import type { AppDispatch, RootState } from './store';


export const ADD_CHARACTERS = 'ADD_CHARACTERS';
export const addCharacters = (characters: Character[]) => ({
  type: ADD_CHARACTERS,
  payload: characters,
});


export type Page = number;

const SET_PAGE = 'SET_PAGE';
const setPage = (page: Page) => ({
  type: SET_PAGE,
  payload: page,
});


export enum RequestStatus {
  Idle = 'idle',
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected',
}

const REQUEST_PENDING = 'REQUEST_PENDING';
const requestPending = () => ({
  type: REQUEST_PENDING,
});

const REQUEST_FULFILLED = 'REQUEST_FULFILLED';
const requestFulfilled = () => ({
  type: REQUEST_FULFILLED,
});

const REQUEST_REJECTED = 'REQUEST_REJECTED';
const requestRejected = () => ({
  type: REQUEST_REJECTED,
});


export const requestFetchCharacters = () => (
  (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const { page, requestStatus } = state.characters as CharactersState;
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
      });
  }
);


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

const charactersReducer: Reducer<CharactersState, AnyAction> = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = initialState,
  { type, payload },
): CharactersState => {
  switch (type) {
  case ADD_CHARACTERS:
    return { ...state, items: state.items.concat(payload as Character[]) };
  case SET_PAGE:
    return { ...state, page: payload as Page };
  case REQUEST_PENDING:
    return { ...state, requestStatus: RequestStatus.Pending };
  case REQUEST_FULFILLED:
    return { ...state, requestStatus: RequestStatus.Fulfilled };
  case REQUEST_REJECTED:
    return { ...state, requestStatus: RequestStatus.Rejected };
  default:
    return state;
  }
};

export default charactersReducer;


export const selectCharacters = (state: RootState) => state.characters.items as Character[];
