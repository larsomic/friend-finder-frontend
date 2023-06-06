import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { LoginActions } from './store_type'
import storage from 'redux-persist/lib/storage'; 

const userReducer = (state = { loggedIn: false }, action:LoginActions) => {
  switch (action.type) {
    case 'LOG_IN':
      return { ...state, loggedIn: true };
    case 'LOG_OUT':
      return { ...state, loggedIn: false };
    case 'SIGNED_UP':
      return { ...state, loggedIn: true };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: userReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
