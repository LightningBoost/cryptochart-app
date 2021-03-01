import {createStore, Store} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Persistor} from 'redux-persist/es/types';
import rootReducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export default (): {store: Store; persistor: Persistor} => {
  const store = createStore(persistedReducer, composeWithDevTools());
  const persistor = persistStore(store);
  return {store, persistor};
};
