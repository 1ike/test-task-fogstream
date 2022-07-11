import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from './store';


type AppLoadingState = boolean;

const initialState: AppLoadingState = true;

const appLoadingSlice = createSlice({
  name: 'appLoading',
  initialState,
  /* eslint-disable no-param-reassign */
  reducers: {
    appLoadingEnd() {
      return false;
    },
  },
  /* eslint-enable no-param-reassign */
});

export const { appLoadingEnd } = appLoadingSlice.actions;

export const appLoadingReducerName = appLoadingSlice.name;

export default appLoadingSlice.reducer;


export const selectAppLoading = (state: RootState) => state.appLoading;
