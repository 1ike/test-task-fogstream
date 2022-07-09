import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { requestFetchCharacters } from '../state/characters';
import { AppStore, RootState } from '../state/store';


// eslint-disable-next-line arrow-body-style
export default async (store: AppStore) => {
  (store.dispatch as ThunkDispatch<RootState, void, AnyAction>)(
    requestFetchCharacters(),
  );
};
