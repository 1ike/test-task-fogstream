import { AnyAction } from 'redux';
import { Reducer } from 'react';

import type { RootState } from './store';


export const APP_LOADING_END = 'APP_LOADING_END';
export const appLoadingEnd = () => ({
  type: APP_LOADING_END,
});


type AppLoadingState = boolean;

const appLoadingReducer: Reducer<AppLoadingState, AnyAction> = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = true,
  { type },
): AppLoadingState => {
  switch (type) {
  case APP_LOADING_END:
    return false;
  default:
    return state;
  }
};

export default appLoadingReducer;


export const selectAppLoading = (state: RootState) => state.appLoading as AppLoadingState;
