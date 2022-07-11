import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Character } from '../types';
import type { RootState } from './store';


type FavouritesState = Character[];

const initialState: FavouritesState = [];

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  /* eslint-disable no-param-reassign */
  reducers: {
    addFavourite(state, action: PayloadAction<Character>) {
      state.push(action.payload);
    },
    removeFavourite(state, action: PayloadAction<Character>) {
      return state.filter((character) => character.id !== action.payload.id);
    },
  },
  /* eslint-enable no-param-reassign */
});

export const { addFavourite, removeFavourite } = favouritesSlice.actions;

export const favouritesReducerName = favouritesSlice.name;

export default favouritesSlice.reducer;


export const selectFavourites = (state: RootState) => state.favourites;

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
