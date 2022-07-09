// import 'dayjs/locale/ru';
// import dayjs from 'dayjs';

import store from '../state/store';
// import persist from './persist';
import fonts from './fonts';
import fetchCharacters from './fetchCharacters';


export const beforeRender = async () => {
  // dayjs.locale('ru');
  // await persist(store);
  await fonts();
  await fetchCharacters(store);
};

export const afterRender = async () => {

};
