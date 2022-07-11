import store from '../state/store';
import persist from './persist';
import fonts from './fonts';
import fetchCharacters from './fetchCharacters';


export const beforeRender = async () => {
  await persist(store);
  await fonts();
};

export const afterRender = async () => {
  await fetchCharacters(store);
};
