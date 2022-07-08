// import 'dayjs/locale/ru';
// import dayjs from 'dayjs';

// import store from '../state/store';
// import persist from './persist';
import fonts from './fonts';
import fetchList from './fetchList';


export const beforeRender = async () => {
  // dayjs.locale('ru');
  // await persist(store);
  await fonts();
  fetchList();
};

export const afterRender = async () => {

};
