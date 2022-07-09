import { persistStore } from 'redux-persist';
import { AppStore } from '../state/store';


export default (store: AppStore) => new Promise((resolve, reject) => {
  try {
    persistStore(store, null, resolve as () => any);
  } catch (error) {
    reject(error);
  }
});
