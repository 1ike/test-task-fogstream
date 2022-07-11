import { AnyAction } from 'redux';
import { Reducer } from 'react';
import { createSelector } from 'reselect';

import { Character } from '../types';
import type { RootState } from './store';


export const ADD_FAVOURITE = 'ADD_FAVOURITE';
export const addFavourite = (character: Character) => ({
  type: ADD_FAVOURITE,
  payload: character,
});

export const REMOVE_FAVOURITE = 'REMOVE_FAVOURITE';
export const removeFavourite = (character: Character) => ({
  type: REMOVE_FAVOURITE,
  payload: character,
});

type FavouritesState = Character[];
const initialState: FavouritesState = [];

const charactersReducer: Reducer<FavouritesState, AnyAction> = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = initialState,
  { type, payload },
): FavouritesState => {
  switch (type) {
  case ADD_FAVOURITE:
    return [...state, payload as Character];
  case REMOVE_FAVOURITE:
    return state.filter((character) => character.id !== (payload as Character).id);
  default:
    return state;
  }
};

export default charactersReducer;


export const selectFavourites = (state: RootState) => state.favourites as FavouritesState;

const selectFavouriteIDs = createSelector(
  selectFavourites,
  (favourites) => favourites.map((favourite) => favourite.id),
);

export const makeSelectorIsFavourite = () => {
  const isFavourite = createSelector(
    [
      selectFavouriteIDs,
      (state, character: Character) => character,
    ],
    (favouritesIDs, character) => favouritesIDs.includes(character.id),
  );

  return isFavourite;
};
